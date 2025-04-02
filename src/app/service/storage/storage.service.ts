import { Injectable, OnInit } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    save(key: string, data: any) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    retrieve(key: string) {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : null;
    }

    delete(key: string) {
        localStorage.removeItem(key);
    }
}