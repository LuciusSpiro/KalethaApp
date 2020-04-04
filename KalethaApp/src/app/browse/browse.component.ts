import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { FirebaseService } from "../services/firebase.service";
import { ChatService } from "../services/chat.service";
import { Message } from "../models/message.model";
import { UserService } from "../services/user.service";
import { borderTopRightRadiusProperty } from "tns-core-modules/ui/page/page";

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    chat: Array<Message>;
    neueNachricht: string;
    constructor(private chatService: ChatService, private userService: UserService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.chat = [];
        this.chatService.subscribeToChat((snapshot) => {
            const chat = [];
            snapshot.forEach((doc) => {
                chat.push(doc.data());
            });

            this.chat = chat.sort((a, b) => this.compareMessages(a, b));
        });
        this.chatService.getAllMessagesFrom().then((chat: Array<Message>) => {
            this.chat = chat.sort((a, b) => this.compareMessages(a, b));
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    sendMessage(): void {
        const message = {
            message: this.neueNachricht,
            from: this.userService.getCurrentUser().itName,
            to: "all",
            date: new Date().toISOString()
        }
        this.chatService.sendMessage(message);
        this.neueNachricht = "";
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
