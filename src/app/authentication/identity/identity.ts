export class InvalidRoleError extends Error {

    constructor(message: string) {
        super(message);
    }
    
}


export enum Role {
    
    STAFF = 'staffs',
    STUDENT = 'students'
    
}

export namespace Role {
    
    export function from(role: any): Role {
        switch (role) {
            case 'staffs':
                return Role.STAFF;
                
            case 'students':
                return Role.STUDENT;
                
            default:
                throw new InvalidRoleError(`Invalid role: ${role}`);
        }
    }
    
}


export class Identity {
    
    readonly id: number;
    readonly name: string;
    readonly role: Role;
    
    
    /**
    * Check whether there is stored login name, id and role
    * Convert the stored details from JSON only if it is not null
    */
    static cached(): Identity {
        const stored = localStorage['identity'];
        if (stored) {
            return Identity.from(JSON.parse(stored));
            
        } else {
            return undefined;
        }
    }
    
    /**
     * Check whether there is cache
     */
    static exists(): boolean {
        return localStorage['identity'] !== undefined;
    }
    
       
    static from(json: any): Identity {
        return new Identity(json.attributes.name, json.id, Role.from(json.type));
    }
    
    static to(identity: Identity): any {
        return {
            id: identity.id,
            type: identity.role,
            attributes: {
                name: identity.name
            }
        };
    }
    
    
    private constructor(name: string, id: number, role: Role) {
        this.name = name;
        this.id = id;
        this.role = role;
    }
    
    
    /**
     * Save login name, id and role of the user as cache
     */
    store(): void {
        localStorage['identity'] = JSON.stringify(Identity.to(this));
    }  
    
    /**
     * Clear the cache
     */
    clear(): void {
        localStorage.removeItem('identity');
    }
    
}
