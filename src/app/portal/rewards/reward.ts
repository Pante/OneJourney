export enum Redemption {
    
    ELIGIBLE = 'Eligible',
    PENDING = 'Pending',
    REDEEMED = 'Redeemed'
    
}

export namespace Redemption {
    
    export function from(redemption: any): Redemption {
        switch (redemption) {
            case 'Eligible':
                return Redemption.ELIGIBLE;
                
            case 'Pending':
                return Redemption.PENDING;
                
            case 'Redeemed':
                return Redemption.REDEEMED;
            
            default:
                return undefined;
        }
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
    
    export function to(reward: Reward): any {
        return null; // TODO
    }
    
    export function from(reward: any): Reward {
        const attributes = reward.attributes;
        return {
            id: reward.id,
            type: reward.type,
            
            image: attributes['image-url'],
            
            information: {
                description: attributes.description,
                points: attributes.points,
                status: Redemption.from(attributes['redeem-status'])
            }
        };
    } 
    
}


