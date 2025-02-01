import { Operation, type EntityOperation, type EntityOperationsRequest } from "../request/EntityOperationsRequest";

interface TopicRelationIds {
    topic_id: number;
    relation_id: number;
}

export class TopicList {
    private original: TopicRelationIds[]
    private study_plan_id: number;
    readonly new_topic_ids: number[];

    constructor(original: TopicRelationIds[], study_plan_id: number) {
        this.original = original;
        this.new_topic_ids = original.map((topicRelation) => topicRelation.topic_id);
        this.study_plan_id = study_plan_id;
        console.log(study_plan_id);
    }

    add(topic_id: number) {
        if(this.new_topic_ids.includes(topic_id))
            throw new Error("topic already exists");

        this.new_topic_ids.push(topic_id);
        console.log(this.new_topic_ids);
    }

    remove(topic_id: number) {
        const index = this.new_topic_ids.findIndex((id) => id === topic_id)
        if(index === -1)
            throw new Error("topic doesn't exists");

        this.new_topic_ids.splice(index, 1);
        console.log(this.new_topic_ids);
    }

    modify(old_id: number, new_id: number) {
        if(this.new_topic_ids.includes(new_id))
            throw new Error("topic already exists");
        
        const index = this.new_topic_ids.findIndex((id) => id === old_id)
        if(index === -1)
            throw new Error("topic doesn't exists");

        this.new_topic_ids.splice(index, 1, new_id);
        console.log(this.new_topic_ids);
    }

    getRequest(): EntityOperationsRequest {
        return {
            id: this.study_plan_id,
            entity_operations:
            [
                ...this.original
                    .slice(0, Math.min(this.original.length, this.new_topic_ids.length))
                    .filter((topicRelation, i) => topicRelation.topic_id !== this.new_topic_ids[i])
                    .map((topicRelation, i): EntityOperation => {
                            return {
                                replacement_id: this.new_topic_ids[i],
                                relationship_id: topicRelation.relation_id,
                                operation: Operation.MODIFY,
                            }
                    }),
                ...this.new_topic_ids
                    .slice(this.original.length)
                    .map((topic_id) => {
                        return {
                            replacement_id: topic_id,
                            relationship_id: 0,
                            operation: Operation.ADD,
                        }
                    }),
                ...this.original
                    .slice(this.new_topic_ids.length)
                    .map((topicRelation) => {
                        return {
                            replacement_id: 0,
                            relationship_id: topicRelation.relation_id,
                            operation: Operation.DELETE,
                        }
                    }),
            ]
        }
    }
}