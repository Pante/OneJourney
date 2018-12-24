export interface Identity {
    
    name: string;
    id: string;
    role: Role;
    
}

export namespace Identity {
    
    export function from(json: any): Identity {
        return {
            name: '',
            id: '',
            role: Role.from(json)
        };
    }
    
}

    
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
    
    export function from(json: any): Role {
        switch (json.data.type) {
            case 'staffs':
                return Role.STAFF;
                
            case 'student':
                return Role.STUDENT;
                
            default:
                throw new InvalidRoleError(`Invalid role: ${json.data.type}`);
        }
    }
    
}
