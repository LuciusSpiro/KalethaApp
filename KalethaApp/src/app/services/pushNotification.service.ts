import { getString, setString } from "tns-core-modules/application-settings";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const firebase = require("nativescript-plugin-firebase");

@Injectable({
    providedIn: "root"
})
export class PushNotificationService {
    private serverUrl: string = "https://fcm.googleapis.com/fcm/send";

    constructor(private http: HttpClient) {
    }

    subscribeToTopic(topic: string) {
        firebase.subscribeToTopic(topic);
    }

    triggerPushNotificationForTopic(topic: string, title: string, information: string, payload: object) {
        const data = {
            notification: {
                title,
                body: information
            },
            data: {
                title,
                body: information,
                payload
            },
            to: "/topics/" + topic
        };
        this.postData(data).subscribe((res) => {
            console.log((<any>res));
        });;
    }

    postData(data: any) {
        const options = this.createRequestOptions();

        return this.http.post(this.serverUrl, data, { headers: options });
    }

    private createRequestOptions() {
        const headers = new HttpHeaders({
            "Content-Type": "application/json",
            Authorization: "key=AAAAz2IeJkY:APA91bGjJ7M2vaYW1IkyxdCmmm1fLxOJK0QWzS" +
                "HB7wQNH2s7Q7_gz3oLN8qlvBrXrEs-m-ptTg_kkdFn-wms5asQAGsFYIJW1eLaZQcY0TmDxcI3n2RC5rYxMAHXDLCrnxPC99D12PX0"
        });

        return headers;
    }
}
