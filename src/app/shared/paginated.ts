import { DeviceDetectorService } from 'ngx-device-detector';


export namespace Pagination {
    
    export interface Size {
        
        desktop?: number;
        mobile?: number;
        tablet?: number;
        
    }
    
}

    
export class Paginated<T> {
    
    private items: T[];

    displayed: T[];
    size: number;
    page: number;
      
        
    static of<T>(device: DeviceDetectorService, size: Pagination.Size = {}): Paginated<T> {
        if (device.isMobile()) {
            return new Paginated<T>(size.mobile === undefined ? 1 : size.mobile);
            
        } else if (device.isTablet()) {
            return new Paginated<T>(size.mobile === undefined ? 1 : size.mobile);
            
        } else {
            return new Paginated<T>(size.desktop === undefined ? 12 : size.desktop);
        }
    }
    
    
    constructor(size: number, page: number = 1) {
        this.items = [];
        this.displayed = [];
        this.size = size;
        this.page = page;
    }
    
    
    load(items: T[], page: number = 1) {
        this.items = items;
        this.set(page);
    } 
    
    
    first(): void {
        return this.to(1);
    }
    
    next(): void {
        return this.to(this.page + 1);
    }
    
    back(): void {
        return this.to(this.page - 1);
    }
    
    last(): void {
        return this.to(Math.ceil(this.items.length / this.size));
    }
    
    
    set(page: number): boolean {
        const end = page * this.size;
        const inbound = this.has(page, end);
        
        if (inbound) {
            this.to(page, end);
        }
        
        return inbound;
    }
        
    private to(page: number, end: number = page * this.size): void {
        this.displayed = this.items.slice(end - this.size, end);
        this.page = page;
    }
    
    
    hasNext(): boolean {
        return this.has(this.page + 1);
    }   
    
    hasBack(): boolean {
        return this.has(this.page - 1);
    } 
    
    private has(page: number, end: number = page * this.size): boolean {
        return page > 0 && end - this.items.length < this.size;
    }
    
}

