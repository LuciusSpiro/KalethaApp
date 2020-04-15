import { Component, OnInit, NgZone, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ChatService } from "../services/chat.service";
import { Message } from "../models/message.model";
import { UserService } from "../services/user.service";
import { Observable, Subject } from "rxjs";
import { publish } from "rxjs/operators";

@Component({
    selector: "chat",
    moduleId: module.id,
    templateUrl: "./chat.component.html"
})
export class ChatComponent implements OnInit {
    $chat: Subject<Array<Message>>;
    neueNachricht: string;

    @ViewChild("chatScrollArea", { static: false }) chatScrollArea: ElementRef;
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

            this.scrollDown();

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
        if (!this.neueNachricht) {
            return;
        }
        const message = {
            message: this.neueNachricht,
            from: this.userService.getCurrentUser().itName,
            to: "all",
            date: new Date().toISOString()
        }
        this.chatService.sendMessage(message);
        this.neueNachricht = "";
    }

    isThisMyMessage(message: Message) {
        return message.from === this.userService.getCurrentUser().itName;
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

    scrollDown() {
        setTimeout(() => {
            this.chatScrollArea.nativeElement
                .scrollToVerticalOffset(this.chatScrollArea.nativeElement.scrollableHeight, false)
        }, 500);
    }
}
