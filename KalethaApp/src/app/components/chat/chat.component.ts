import { Component, ViewChild, ElementRef, NgZone, OnInit, Input } from "@angular/core";
import { Subject } from "rxjs";
import { Message } from "~/app/models/message.model";
import { ChatService } from "~/app/components/chat/chat.service";
import { UserService } from "~/app/services/user.service";
import { PushNotificationService } from "~/app/services/pushNotification.service";

@Component({
    selector: "Chat",
    templateUrl: "./chat.component.html",
    styleUrls: ["./chat.Component.scss"]
})
export class ChatComponent implements OnInit {
    @Input() channel: string;
    $chat: Subject<Array<Message>>;
    neueNachricht: string;
    limit: number = 20;

    @ViewChild("chatScrollArea", { static: false }) chatScrollArea: ElementRef;
    constructor(
        private chatService: ChatService,
        private userService: UserService,
        private pushService: PushNotificationService,
        private zone: NgZone) {
    }

    ngOnInit(): void {
        this.$chat = new Subject<Array<Message>>();

        this.chatService.subscribeToChat(this.fetchMessageCallback, this.channel, this.limit);
    }

    sendMessage(): void {
        if (!this.neueNachricht) {
            return;
        }
        const message = {
            message: this.neueNachricht,
            from: this.userService.getCurrentUser().otName,
            to: "all",
            date: new Date()
        };
        this.chatService.sendMessage(message, this.channel);
        this.pushService.triggerPushNotificationForTopic(
            "all", // this.channel,
            message.from,
            message.message,
            { type: "chat" }
        );

        this.neueNachricht = "";
    }

    isThisMyMessage(message: Message) {
        return message.from === this.userService.getCurrentUser().otName;
    }

    increaseLimit() {
        this.limit += 20;
        this.chatService.subscribeToChat(this.fetchMessageCallback, this.channel, this.limit);
    }

    scrollDown() {
        setTimeout(() => {
            this.chatScrollArea.nativeElement
                .scrollToVerticalOffset(this.chatScrollArea.nativeElement.scrollableHeight, false);
        }, 300);
    }

    fetchMessageCallback = (snapshot) => {
        const chat = [];
        snapshot.forEach((doc) => {
            chat.push(doc.data());
        });
        this.zone.run(() => this.$chat.next(chat.reverse()));

        this.scrollDown();
    }
}
