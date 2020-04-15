import { Component, OnInit, Input } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Message } from "~/app/models/message.model";

@Component({
    selector: "Message",
    templateUrl: "./message.component.html",
    styleUrls: ["./message.Component.scss"]
})
export class MessageComponent implements OnInit {
    @Input() text: string;
    @Input() from: string;
    @Input() right: boolean;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {

    }
}
