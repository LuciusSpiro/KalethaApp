import { Component, OnInit, NgZone } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ChatService } from "../services/chat.service";
import { Message } from "../models/message.model";
import { UserService } from "../services/user.service";
import { Observable, Subject } from "rxjs";
import { publish } from "rxjs/operators";

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    $chat: Subject<Array<Message>>;
    neueNachricht: string;
    constructor(private chatService: ChatService, private userService: UserService, private zone: NgZone) {

    }

    ngOnInit(): void {
        this.$chat = new Subject<Array<Message>>();

        this.chatService.subscribeToChat((snapshot) => {
            const chat = [];
            snapshot.forEach((doc) => {
                chat.push(doc.data());
            });
            this.zone.run(() => this.$chat.next(chat.sort((a, b) => this.compareMessages(a, b))));

        });
        this.chatService.getAllMessagesFrom().then((chat: Array<Message>) => {
            this.$chat.next(chat.sort((a, b) => this.compareMessages(a, b)));
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
