export enum Role {

    STAFF = 'staffs',
    STUDENT = 'student',
    INVALID = 'invalid'
}

export namespace Role {
    
    export function from(body: any): Role {
        if (!body.data || !body.data.type) {
            return Role.INVALID;
        }
        
        switch (body.data.type) {
            case 'staffs':
                return Role.STAFF;
                
            case 'student':
                return Role.STUDENT;
                
            default:
                return Role.INVALID;
        }
    }
    
}
