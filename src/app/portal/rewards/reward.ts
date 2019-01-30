export enum Status {
    
    ELIGIBLE = 'Eligible',
    INELIGIBLE = 'Ineligible',
    PENDING = 'Pending',
    COLLECTION = 'Collection',
    REDEEMED = 'Redeemed'
    
}

export namespace Status {
    
    export function from(redemption: any): Status {
        switch (redemption) {
            case 'Eligible':
                return Status.ELIGIBLE;
                
            case 'Ineligible':
                return Status.INELIGIBLE;
                
            case 'Pending':
                return Status.PENDING;
                
            case 'Collection':
                return Status.COLLECTION;
                
            case 'Redeemed':
                return Status.REDEEMED;
            
            default:
                return undefined;
        }
    }
    
}

export interface Reward {
    
    id: number;
    image: string;
    description: string;
    points: number;
    status: Status;
    
}

export namespace Reward {
    
    export function from(reward: any): Reward {
        const attributes = reward.attributes;
        return {
            id: reward.id,
            image: attributes['image-url'],
            description: attributes.description,
            points: attributes.points,
            status: Status.from(attributes['redeem-status'])
        };
    }
    
}


