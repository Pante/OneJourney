import {Reward} from '../reward';


export interface Item {
    
    reward: Reward[];
    quantity: number;
    
}

export namespace Item {
    
    export function format(items: { [key: number]: number }): any {
        const list: any[] = [];
        for (const id of Object.keys(items)) {
            list.push({
                'reward-catelogue-id': id,
                quantity: items[id]
            });
        }
        
        return list;
    }
    
}


export namespace Redemption {
    
    export function format(id: number, items: { [key: number]: number }): any {
        return {
            'student-no': id,
            items: Item.format(items)
        };
    }
    
}

