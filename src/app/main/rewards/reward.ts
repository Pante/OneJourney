export enum Redemption {
    // TODO
}

export namespace Redemption {
    
    export function deserialize(json: any): Redemption {
        return null; // TODO
    }
    
}


export interface Reward {
    
    id: number;
    type: string;
    
    image: string;
    
    information: {
        description: string;
        points: number;
        status: Redemption;
    };
    
}

export namespace Reward {
    
    export function serialize(reward: Reward): any {
        return null; // TODO
    }
    
    export function deserialize(data: any): Reward {
        const attributes = data.attributes;
        return {
            id: data.id,
            type: data.type,
            
            image: attributes['image-url'],
            
            information: {
                description: attributes.description,
                points: attributes.points,
                status: Redemption.deserialize(attributes['redeem-status'])
            }
        };
    } 
    
}


