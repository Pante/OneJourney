export interface Faction {
    id: number;
    type: string;

    image: string;
    
    info: {
        name: string;
        points: number;
    };
}

export namespace Faction {

    export function to(data: Faction): any {
        return null;
    }

    export function from(data: any): Faction {
        const attributes = data.attributes;

        return {
            id: data.id,
            type: data.type,
            
            image: attributes['image-url'],

            info: {
                name: attributes.name,
                points: attributes.points
            }
        };
    }
}
