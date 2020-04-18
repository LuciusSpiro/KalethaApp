import { Injectable } from "@angular/core";
import { Con } from "../models/convention.model";
import { Subject } from "rxjs";

const firebase = require("nativescript-plugin-firebase");

@Injectable({
    providedIn: "root"
})
export class ConService {
    $cons: Subject<Array<Con>>;
    conList: Array<Con>;
    init(): void {
        this.$cons = new Subject();
        this.getAllCons().then((cons) => {
            this.$cons.next(cons);
        });
        this.$cons.subscribe((cons: Array<Con>) => this.conList = cons);
        this.subscribeToConCollection((snapshot) => {
            const cons = [];
            snapshot.forEach((doc) => {
                cons.push(doc.data());
            });

            this.$cons.next(cons);
        });
    }

    subscribeToConCollection(callBack: any): void {
        firebase.firestore.collection("Cons").onSnapshot(callBack);
    }

    getCon(name: string): Con {
        return this.conList.find((con) => con.name === name);
    }

    getAllCons(): Promise<Array<Con>> {
        return firebase.firestore.collection("Cons").get({ source: "server" }).then((querySnapshot) => {
            const cons = [];
            querySnapshot.forEach((doc) => {
                cons.push(doc.data());
            });

            return cons;
        });
    }

    addCon(con: Con): void {
        if (!con.name) {
            return;
        }
        this.conList.push(con);
        firebase.firestore.collection("Cons").doc(con.name).set(con);

    }

    updateCon(con: Con): void {
        this.conList.map((entry) => {
            if (entry.name === con.name) {
                entry = con;
            }

            return entry;
        });
        firebase.firestore.collection("Cons").doc(con.name).update(con);
    }

}
