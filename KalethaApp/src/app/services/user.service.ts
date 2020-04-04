import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { IKalethaner } from "../models/kalethaner.model";

const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class UserService {
    private currentUser: IKalethaner;
    constructor(

    ) { }

    getAllUser() {
        const userCollection = firebase.firestore.collection("Kalethaner");
        userCollection.get({ source: "server" }).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
            });
        });
    }

    getCurrentUser(): IKalethaner {
        if (this.currentUser) {
            return this.currentUser;
        }

        return { itName: "", otName: "", rang: "" }
    }

    fetchCurrentUser(): Promise<void> {
        return firebase.getCurrentUser()
            .then((user: User) => {
                return firebase.firestore.collection("Kalethaner").doc(user.email).get({ source: "server" })
            })
            .then((doc) => this.currentUser = doc.data())
            .catch((error) => console.log("user not found" + error));
    }

    addKalethanerToDatabase(email: string, neuerKalethaner: IKalethaner): void {
        const kalethanersCollection = firebase.firestore.collection("Kalethaner");
        kalethanersCollection.doc(email).set(neuerKalethaner);
        this.currentUser = neuerKalethaner;
    }
}
