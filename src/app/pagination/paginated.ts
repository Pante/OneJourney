import { DeviceDetectorService } from 'ngx-device-detector';
   
 
export interface Configuration {
    
    size: number;
    pages: number;
    
}

export interface Devices {

    desktop: Configuration;
    mobile: Configuration;
    tablet: Configuration;

}

export const devices: Devices = {
    
    desktop: {
        size: 30,
        pages: 15
    },
    
    mobile: {
        size: 3,
        pages: 7
    },
    
    tablet: {
        size: 4,
        pages: 10
    }
};

    
export class Paginated<T> {
    
    private items: T[];

    configuration: Configuration;
    displayed: T[];
    page: number;
    end: number;
    
        
    static of<T>(device: DeviceDetectorService, configuration: Devices = devices): Paginated<T> {
        if (device.isMobile()) {
            return new Paginated<T>(configuration.mobile);
            
        } else if (device.isTablet()) {
            return new Paginated<T>(configuration.tablet);
            
        } else {
            return new Paginated<T>(configuration.desktop);
        }
    }
    
    
    constructor(configuration: Configuration) {
        this.items = [];
        this.configuration = configuration;
        this.displayed = [];
        this.page = 0;
    }
    
    
    load(items: T[], page: number = 1) {
        this.items = items;
        this.end = Math.ceil(this.items.length / this.configuration.size);
        this.set(page);
    } 
    
    
    first(): void {
        this.set(1);
    }
    
    next(): void {
        this.to(this.page + 1);
    }
    
    back(): void {
        this.to(this.page - 1);
    }
    
    last(): void {
        return this.to(this.end);
    }
    
    set(page: number): boolean {
        const valid = 1 <= page && page <= this.end && page !== this.page;
        if (valid) {
            this.to(page);
        }
        
        return valid;
    }
        
    private to(page: number): void {
        const end = page * this.configuration.size;
        
        this.displayed = this.items.slice(end - this.configuration.size, end);
        this.page = page;
    }
    
    
    pages(): number[] {
        const left = this.page - Math.floor((this.configuration.pages - 1) / 2);
        const right = this.page + Math.floor(this.configuration.pages / 2);
        
        const leftmost = Math.max(left - Math.max(right - this.end, 0), 1);
        const rightmost = Math.min(right + Math.max(1 - left, 0), this.end);
        
        const pages = [];
        for (let i = leftmost; i <= rightmost; i++) {
            pages.push(i);
        }
         
        return pages;
    }
    
    
    hasNext(): boolean {
        return this.page + 1 <= this.end;
    }   
    
    hasBack(): boolean {
        return this.page - 1 >= 1;
    }
    
}

