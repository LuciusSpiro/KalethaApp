import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ChatRoomRoutingModule } from "./chatRoom-routing.module";
import { ChatRoomComponent } from "./chatRoom.component";
import { ChatService } from "../services/chat.service";
import { NativeScriptFormsModule } from "nativescript-angular/forms/forms.module";
import { MessageComponent } from "./message/message.component";
import { ChatComponent } from "./chat/chat.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ChatRoomRoutingModule
    ],
    declarations: [
        ChatRoomComponent,
        MessageComponent,
        ChatComponent
    ],
    providers: [
        ChatService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChatRoomModule { }
