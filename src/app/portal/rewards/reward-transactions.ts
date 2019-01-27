export interface Transaction {
    
    points: number;
    description: string;
    
}

export namespace Transaction {
    
    export function create(transaction: Transaction): any {
        return {
            reward: transaction
        };
    }
    
    export function edit(id: number, transaction: Transaction): any {
        return {
            id: id,
            reward: transaction
        };
    }
    
}
