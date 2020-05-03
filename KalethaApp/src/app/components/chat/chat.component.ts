import { Component, ViewChild, ElementRef, NgZone, OnInit, Input } from "@angular/core";
import { Subject } from "rxjs";
import { Message } from "~/app/models/message.model";
import { ChatService } from "~/app/components/chat/chat.service";
import { UserService } from "~/app/services/user.service";

@Component({
    selector: "Chat",
    templateUrl: "./chat.component.html",
    styleUrls: ["./chat.Component.scss"]
})
export class ChatComponent implements OnInit {
    @Input() channel: string;
    $chat: Subject<Array<Message>>;
    neueNachricht: string;

    @ViewChild("chatScrollArea", { static: false }) chatScrollArea: ElementRef;
    constructor(
        private chatService: ChatService,
        private userService: UserService,
        private zone: NgZone) {
    }

    ngOnInit(): void {
        this.$chat = new Subject<Array<Message>>();

        this.chatService.subscribeToChat((snapshot) => {
            const chat = [];
            snapshot.forEach((doc) => {
                chat.push(doc.data());
            });
            this.zone.run(() => this.$chat.next(chat.reverse()));

            this.scrollDown();
        }, this.channel);
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
        this.neueNachricht = "";
    }

    isThisMyMessage(message: Message) {
        return message.from === this.userService.getCurrentUser().otName;
    }

    scrollDown() {
        setTimeout(() => {
            this.chatScrollArea.nativeElement
                .scrollToVerticalOffset(this.chatScrollArea.nativeElement.scrollableHeight, false);
        }, 300);
    }

    test() {
        console.log(this.chatScrollArea.nativeElement.verticalOffset);
    }
}
