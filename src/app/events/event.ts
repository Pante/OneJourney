export interface Event {
    
    title: string;
    image: string;
    
}

export namespace Event {
        
    export function serialize(event: Event): any {
        return null;
    }
     
    export function deserialize(json: any): Event {
       return null; 
    }
    
}
