import { Faction } from '../leaderboard/faction';


export interface Staff {
    
    id: number;
    name: string;
    email: string;
    
}

export namespace Staff {
    
    export function from(staff: any): Staff {
        return {
            id: staff.id,
            name: staff.name,
            email: staff['email-id']
        };
    }
    
}


export interface Group {
    
    id: number;
    code: string;
    faction: Faction;
    staff: Staff;
    
}

export namespace Group {
    
    export function from(group: any): Group {
        return {
            id: group.id,
            code: group.code,
            faction: group.faction,
            staff: group.staff
        };
    }
    
}


export interface Award {
    
    id: number;
    name: string;
    amount: number;
    image: string;
    
}

export namespace Award {
    
    export function from(award: any): Award {
        return {
            id: award.id,
            name: award['award-name'],
            amount: award.amount,
            image: award['image-url']
        };
    }
    
}


export interface User {
    id: number;
    type: string;
    name: string;
    studentNumber: string;
    points: number;
    bytes: number;

    group: Group;

    awards: Award[];
}

export namespace User {
    
    export function from(data: any): User {
        const attributes = data.attributes;
        
        return {
            id: data.id,
            type: data.type,
            studentNumber: attributes['stud-no'],
            name: attributes.name,
            points: attributes.points,
            bytes: attributes['redemption-balance'],

            group: Group.from(attributes['mentor-group']),

            awards: (attributes['student-awards'] as any[]).map(award => Award.from(award))
        };
    }
    
}
