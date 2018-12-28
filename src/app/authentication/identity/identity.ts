export enum Role {
    STAFF = 'staffs',
    STUDENT = 'student'
}

export class InvalidRoleError extends Error {
    
    constructor(message: string) {
        super(message);
    }
    
}

export namespace Role {
    
    export function from(role: any): Role {
        switch (role) {
            case 'staffs':
                return Role.STAFF;
                
            case 'student':
                return Role.STUDENT;
                
            default:
                throw new InvalidRoleError(`Invalid role: ${role}`);
        }
    }
    
}


export interface Identity {
    
    name: string;
    id: string;
    role: Role;
    
}

export namespace Identity {
    
    export function from(json: any): Identity {
        return {
            name: json.data.attributes.name,
            id: json.data.id,
            role: Role.from(json.data.type)
        };
    }
    
}
