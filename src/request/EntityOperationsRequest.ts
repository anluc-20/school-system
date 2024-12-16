
export enum Operation { ADD, MODIFY, DELETE}

export interface EntityOperation{
    replacement_id: number;
    relationship_id: number;
    operation: Operation;
}

export interface EntityOperationsRequest{
    id: number;
    entity_operations: EntityOperation[];
}