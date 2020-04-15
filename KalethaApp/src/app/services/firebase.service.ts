import { Injectable } from "@angular/core";
import { BackendService } from "./backend.service";
import { User } from "../models/user.model";

const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class FirebaseService {
    constructor(
    ) { }

    getMessage() {
        firebase.addOnMessageReceivedCallback((data) => {
            alert(JSON.stringify(data));
        });
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
}
