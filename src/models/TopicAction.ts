import {Operation, type EntityOperation } from "../request/EntityOperationsRequest";


export class TopicActionImp implements EntityOperation {
    readonly replacement_id: number;
    readonly relationship_id: number;
    readonly operation: Operation;
    
    constructor(
        topic_id: number,
        relationship_id: number,
        operation: Operation,
    ) {
        if(topic_id < 1) 
            throw new Error("invalid topic_id");
    
        if((operation == Operation.MODIFY) && (relationship_id < 0))
            throw new Error("invalid relationship_id");
    
        if((operation == Operation.ADD) && (relationship_id !== 0))
            throw new Error("relationship_id must be 0 when adding a new topic");
    
        this.replacement_id = topic_id;
        this.relationship_id = relationship_id;
        this.operation = operation;
    }

    equals(action: EntityOperation): boolean {
        return (this.operation === action.operation)
            && (this.relationship_id === action.relationship_id)
            && (this.replacement_id === action.replacement_id);
    }

    compareTopicId(topic_id: number): number {
        if(this.replacement_id > topic_id) return 1;
        if(this.replacement_id < topic_id) return -1;
        return 0;
    }

    isOpossite(action: EntityOperation): boolean {
        if(
            (this.operation === Operation.ADD &&
            action.operation === Operation.DELETE) ||
            (this.operation === Operation.DELETE &&
            action.operation === Operation.ADD)
            &&
            this.replacement_id === action.replacement_id
        )
            return true;

        else
            return false;
    }

}
interface TopicRelationshipId {
    topic_id: number;
    relationship_id: number;
}

export class TopicActionList {
    private actions: TopicActionImp[] = [];
    private currents: TopicRelationshipId[];

    constructor(currents: TopicRelationshipId[]) {
        this.currents = currents;
    }
    private findInCurrent(topic_id: number): number {
        return this.currents.findIndex((current) => current.topic_id === topic_id);
    }
    private findInCurrentByRelationship(relationship_id: number): number {
        return this.currents.findIndex((current) => current.relationship_id === relationship_id);
    }
    private findInActions(relationship_id: number): number {
        return this.actions.findIndex((action) => action.relationship_id === relationship_id);
    }
    private findAction(topic_action: TopicActionImp): number {
        return this.actions.findIndex((action) => topic_action.equals(action));
    }
    private findOpossite(topic_action: TopicActionImp): number {
        return this.actions.findIndex((action) => action.isOpossite(topic_action));
    }
    push(action: TopicActionImp) {

        let indexCurrent, indexActions, indexOpossite;

        
        if(action.operation === Operation.ADD) {
            indexCurrent = this.findInCurrent(action.replacement_id);
            indexActions = this.findAction(action);

            if((indexCurrent !== -1) || (indexActions !== -1))
                throw new Error("topic already exists");

            //Procede to decide how to add
            indexOpossite = this.findOpossite(action);
            if(indexOpossite === -1)
                //push ADD operation
                this.actions.push(action);
            else
                //Cancel DELETE operation
                this.actions.splice(indexOpossite);
        }

        if(action.operation === Operation.DELETE) {
            indexCurrent = this.findInCurrent(action.replacement_id);
            indexActions = this.findAction(action);

            if(indexActions !== -1)
                throw new Error("topic already deleted");
            if(indexCurrent === -1)
                throw new Error("topic doesn't exists");

            //Procede to decide how to delete
            indexOpossite = this.findOpossite(action);
            if(indexOpossite === -1)
                //push DELETE operation
                this.actions.push(action);
            else
                //Cancel ADD operation
                this.actions.splice(indexOpossite);
        }

        if(action.operation === Operation.MODIFY) {
            indexActions = this.findAction(action);
        
            if(indexActions !== -1)
                throw new Error("same modification");

            indexCurrent = this.findInCurrentByRelationship(action.relationship_id);
            if(indexCurrent === -1)
                throw new Error("topic doesn't exists");

            //Procede to 
            indexActions = this.findInActions(action.relationship_id);
            if(indexActions === -1)
                //push MODIFY operation
                this.actions.push(action);
            else if(action.replacement_id === this.currents[indexCurrent].topic_id)
                this.actions.splice(indexActions);
            else
                this.actions.splice(indexActions, 1, action);
        }
        
    }
}