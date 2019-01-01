export interface Factions {
    id: number;
    type: string;

    info: {
        name: string;
        points: number;
    };
    image: string;
}

export namespace Factions {

    export function to(data: Factions): any {
        return null;
    }

    export function from(data: any): Factions {
        const attributes = data.attributes;

        return {
            id: data.id,
            type: data.type,

            info: {
                name: attributes.name,
                points: attributes.points
            },
            image: `../../../assets/images/team/id${data.id}${attributes.name}shield.png`
        };
    }
}
