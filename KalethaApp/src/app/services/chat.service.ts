import { Injectable } from "@angular/core";
import { User } from "../models/user.model";
import { IKalethaner } from "../models/kalethaner.model";
import { Message } from "../models/message.model";

const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class ChatService {
    constructor(

    ) { }

    subscribeToChat(callBack: any) {
        const chatCollection = firebase.firestore.collection("Chat");

        chatCollection.onSnapshot(callBack);
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
        const chatCollection = firebase.firestore.collection("Chat");
        chatCollection.add(message);
    }
}
