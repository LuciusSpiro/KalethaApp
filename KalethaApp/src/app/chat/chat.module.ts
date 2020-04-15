import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ChatRoutingModule } from "./chat-routing.module";
import { ChatComponent } from "./chat.component";
import { ChatService } from "../services/chat.service";
import { NativeScriptFormsModule } from "nativescript-angular/forms/forms.module";
import { MessageComponent } from "./message/message.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ChatRoutingModule
    ],
    declarations: [
        ChatComponent,
        MessageComponent
    ],
    providers: [
        ChatService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChatModule { }
