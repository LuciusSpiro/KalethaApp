import { Component, Input } from "@angular/core";


@Component({
    selector: "Message",
    templateUrl: "./message.component.html",
    styleUrls: ["./message.Component.scss"]
})
export class MessageComponent {
    @Input() text: string;
    @Input() from: string;
    @Input() right: boolean;
}
