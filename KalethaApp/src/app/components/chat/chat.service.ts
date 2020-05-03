import { Injectable } from "@angular/core";
import { Message } from "../../models/message.model";

const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class ChatService {

    subscribeToChat(callBack: any, channel: string) {
        firebase.firestore.collection(channel).orderBy("date", "desc").limit(3).onSnapshot(callBack);
    }

    getAllMessagesFrom(channel: string): Promise<Array<Message>> {
        return firebase.firestore.collection(channel)
            .orderBy("date")
            .get({ source: "server" })
            .then((querySnapshot) => {
                const chat = [];
                querySnapshot.forEach((doc) => {
                    chat.push(doc.data());
                });

                return chat;
            });
    }

    sendMessage(message: Message, channel: string) {
        firebase.firestore.collection(channel).add(message);
    }
}
