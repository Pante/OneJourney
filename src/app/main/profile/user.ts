export interface Staff {
    id: number;
    name: string;
    email_id: string;
}

export interface Faction {
    id: number;
    name: string;
    points: number;
}

export namespace Faction {
    export function from(faction: any): Faction {
        return {
            id: faction.id,
            name: faction.name,
            points: faction.points
        };
    }
}
export interface Staff {
        id: number;
        name: string;
        email_id: string;
}

export namespace Staff {
    export function from(staff: any): Staff {
        return {
            id: staff.id,
            name: staff.name,
            email_id: staff['email-id']
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
    amount: number;
    name: string;
}

export namespace Award {
    export function from(award: any): Award {
        return {
            id: award.id,
            amount: award.amount,
            name: award['award-name']
        };
    }
}

export interface User {
    id: number;
    type: string;

    info: {
        id: string;
        name: string;
        points: number;
        balance: number;
    };
    group: Group;

    awards: Award[];
}

export namespace User {
    export function to(data: User): any {
        return null;
    }
    
    export function from(data: any): User {
        const attributes = data.attributes;
        return {
            id: data.id,
            type: data.type,
            info: {
                id: attributes['stud-no'],
                name: attributes.name,
                points: attributes.points,
                balance: attributes['redemption-balance']
            },

            group: Group.from(attributes['mentor-group']),

            awards: (attributes['student-awards'] as any[]).map(award => Award.from(award))
        };
    }
}
