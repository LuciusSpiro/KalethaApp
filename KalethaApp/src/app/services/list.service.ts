import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class ListService {
    private classList: Array<string> = [
        "Zivilist",
        "Diplomat",
        "Heiler",
        "Tross",
        "Schild",
        "Stange",
        "Schütze",
        "Kundschafter",
        "Magier"
    ];

    private rangList: Array<string> = [
        "Elos",
        "Milos",
        "Omnos",
        "Prios",
        "Lythos",
        "Corvos"
    ];

    private assignList: Array<string> = [
        "Keine Zeit",
        "Interessiert",
        "Dabei"
    ];

    private areaList: Array<string> = [
        "Speyer",
        "Kaiserslautern",
        "Karlsruhe"
    ];

    getClassList(): Array<string> {
        return this.classList;
    }

    getRangList(): Array<string> {
        return this.rangList;
    }

    getAssignList(): Array<string> {
        return this.assignList;
    }

    getAreaList(): Array<string> {
        return this.areaList;
    }
}
