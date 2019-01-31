export interface Item {
    
    id: number;
    quantity: number;
    
}

export namespace Item {
    
    export function format(items: Map<number, number>): any {
        const list: any[] = [];
        items.forEach((id, quantity) => {
            list.push({
                'reward-catelogue-id': id,
                quantity: quantity
            });
        });
        
        return list;
    }
    
}


export namespace Redemption {
    
    export function format(id: number, items: Map<number, number>): any {
        return {
            'student-no': id,
            items: Item.format(items)
        };
    }
    
}

