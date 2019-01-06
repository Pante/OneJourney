export interface Faction {
    
    id: number;
    image?: string;
    name: string;
    points: number;
    
}

export namespace Faction {

    export function to(faction: Faction): any {
        return null;
    }

    export function from(data: any): Faction {
        const attributes = data.attributes;

        return {
            id: data.id,
            image: attributes['image-url'],
            name: attributes.name,
            points: attributes.points
        };
    }
    
}
