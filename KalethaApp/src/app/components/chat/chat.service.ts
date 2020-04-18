import { Injectable } from "@angular/core";
import { Message } from "../../models/message.model";

const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class ChatService {

    subscribeToChat(callBack: any) {
        firebase.firestore.collection("Chat").onSnapshot(callBack);
    }

    getAllMessagesFrom(): Promise<Array<Message>> {
        return firebase.firestore.collection("Chat").get({ source: "server" }).then((querySnapshot) => {
            const chat = [];
            querySnapshot.forEach((doc) => {
                chat.push(doc.data());
            });

            return chat;
        });
    }

    sendMessage(message: Message) {
        firebase.firestore.collection("Chat").add(message);
    }

    compareMessages(a: Message, b: Message) {
        if (a.date < b.date) {
            return -1;
        }
        if (a.date > b.date) {
            return 1;
        }

        return 0;
    }
}
