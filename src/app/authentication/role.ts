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
    
    export function from(body: any): Role {
        switch (body.data.type) {
            case 'staffs':
                return Role.STAFF;
                
            case 'student':
                return Role.STUDENT;
                
            default:
                throw new InvalidRoleError(`Invalid role: ${body.data.type}`);
        }
    }
    
}
