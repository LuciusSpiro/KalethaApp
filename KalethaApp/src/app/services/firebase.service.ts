import { Injectable, NgZone } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { share } from "rxjs/operators";
import { BackendService } from "./backend.service";
import { User } from "../models/user.model";
import { Yowl } from "../models/yowl";

const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class FirebaseService {

    yowls: BehaviorSubject<Array<Yowl>> = new BehaviorSubject([]);
    chats: BehaviorSubject<Array<Yowl>> = new BehaviorSubject([]);
    private _allYowls: Array<Yowl> = [];
    private _allChats: Array<Yowl> = [];
    constructor(
        private ngZone: NgZone
    ) { }

    getMessage() {
        firebase.addOnMessageReceivedCallback((data) => {
            alert(JSON.stringify(data));
        });
    }

    getMessagesForChannel() {
        // const  = firebase.firestore().collection("cities");
    }



    register(user: User) {
        return firebase.createUser({
            email: user.email,
            password: user.password
        }).then(
            (result: any) => {
                return JSON.stringify(result);
            },
            (errorMessage: any) => {
                alert(errorMessage);
            }
        );
    }

    login(user: User) {
        return firebase.login({
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: user.email,
                password: user.password
            }
        }).then((result: any) => {
            BackendService.token = result.uid;

            return JSON.stringify(result);
        }, (errorMessage: any) => {
            alert(errorMessage);
        });
    }

    logout() {
        BackendService.token = "";
        firebase.logout();
    }

    /*resetPassword(email) {
        return firebase. .resetPassword({
            email: email
        }).then((result: any) => {
            alert(JSON.stringify(result));
        },
            function (errorMessage: any) {
                alert(errorMessage);
            }
        ).catch(this.handleErrors);
    }*/

    getYowls(): Observable<any> {
        return new Observable((observer: any) => {
            const path = "Yowls";

            const onValueEvent = (snapshot: any) => {
                this.ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).pipe(
            share()
        );
    }

    handleSnapshot(data: any) {
        // empty array, then refill and filter
        this._allYowls = [];
        if (data) {
            // tslint:disable-next-line: forin
            for (const id in data) {
                const result = (<any>Object).assign({ id }, data[id]);
                this._allYowls.push(result);
            }
            this.publishUpdates();
        }

        return this._allYowls;
    }

    getChats(): Observable<any> {
        return new Observable((observer: any) => {
            const path = "Chats";

            const onValueEvent = (snapshot: any) => {
                this.ngZone.run(() => {
                    const results = this.handleChatSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        }).pipe(
            share()
        );
    }

    handleChatSnapshot(data: any) {
        // empty array, then refill and filter
        this._allChats = [];
        if (data) {
            // tslint:disable-next-line: forin
            for (const id in data) {
                const result = (<any>Object).assign({ id }, data[id]);
                this._allChats.push(result);
            }
            this.publishChatUpdates();
        }

        return this._allChats;
    }

    sendYowl(Yowl: any) {
        const yowl = Yowl;
        // firebase.subscribeToTopic("test");

        return firebase.push(
            "/all",
            { name: "Mr. Growlllr", username: "MrGrwwlr", text: "Yo", UID: BackendService.token, date: 0 - Date.now() }
        ).then(
            (result: any) => {
                return "Yowwled!";
            },
            (errorMessage: any) => {
                console.log(errorMessage);
            });
    }

    chat(message: string) {
        // let chat = Chat;
        console.log(message);

        return firebase.push(
            "/Chats",
            { message, to: "MrGrwwlr", from: BackendService.token }
        ).then(
            (result: any) => {
                return "chatted";
            },
            (errorMessage: any) => {
                console.log(errorMessage);
            });
    }

    publishUpdates() {
        this._allYowls.sort((a, b) => {
            if (a.date < b.date) { return -1; }
            if (a.date > b.date) { return 1; }

            return 0;
        });
        this.yowls.next([...this._allYowls]);
    }

    publishChatUpdates() {
        this._allChats.sort((a, b) => {
            if (a.date > b.date) { return -1; }
            if (a.date < b.date) { return 1; }

            return 0;
        });
        this.chats.next([...this._allChats]);
    }

    handleErrors(error) {
        console.log(JSON.stringify(error));

        return Promise.reject(error.message);
    }
}
