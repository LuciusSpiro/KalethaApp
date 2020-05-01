import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { Kalethaner } from "../models/kalethaner.model";

const firebase = require("nativescript-plugin-firebase");

@Injectable({
    providedIn: "root"
})
export class UserService {
    private currentUser: Kalethaner;

    subscribeToUser(callBack: any) {
        firebase.firestore.collection("Kalethaner").onSnapshot(callBack);
    }

    getAllUser(): Promise<Array<Kalethaner>> {
        return firebase.firestore.collection("Kalethaner").get({ source: "server" }).then((querySnapshot) => {
            const kalethaner = [];
            querySnapshot.forEach((doc) => {
                kalethaner.push(doc.data());
            });

            return kalethaner;
        });
    }

    getUserByName(name: string): Promise<Kalethaner> {
        return firebase.getCurrentUser()
            .then((user: User) => {
                return firebase.firestore.collection("Kalethaner")
                    .where("otName", "==", name)
                    .get({ source: "server" });
            })
            .then((querySnapshot) => {
                const result = [];
                querySnapshot.forEach((doc) => {
                    result.push(doc.data());
                });

                return result[0];
            })
            .catch((error) => console.log("user not found" + error));
    }

    getCurrentUser(): Kalethaner {
        if (this.currentUser) {
            return this.currentUser;
        }

        return new Kalethaner();
    }

    fetchCurrentUser(): Promise<void> {
        return firebase.getCurrentUser()
            .then((user: User) => {
                return firebase.firestore.collection("Kalethaner")
                    .where("eMail", "==", user.email)
                    .get({ source: "server" });
            })
            .then((querySnapshot) => {
                const result = [];
                querySnapshot.forEach((doc) => {
                    result.push(doc.data());
                });
                this.currentUser = result[0];

                return result[0];
            })
            .catch((error) => console.log("user not found" + error));
    }

    addKalethanerToDatabase(neuerKalethaner: Kalethaner): void {
        const kalethanersCollection = firebase.firestore.collection("Kalethaner");
        kalethanersCollection.doc(neuerKalethaner.otName).set(neuerKalethaner);
        this.currentUser = neuerKalethaner;
    }

    updateKalethaner(kalethaner: Kalethaner): void {
        if (this.currentUser.otName === kalethaner.otName) {
            this.currentUser = kalethaner;
        }

        firebase.firestore.collection("Kalethaner").doc(kalethaner.otName).update(kalethaner);
    }
}
