import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ChatRoomRoutingModule } from "./chatRoom-routing.module";
import { ChatRoomComponent } from "./chatRoom.component";
import { ChatService } from "../components/chat/chat.service";
import { NativeScriptFormsModule } from "nativescript-angular/forms/forms.module";
import { ChatModule } from "../components/chat/chat.module";
import { SharedModule } from "../components/shared.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ChatRoomRoutingModule,
        ChatModule,
        SharedModule
    ],
    declarations: [
        ChatRoomComponent
    ],
    providers: [
        ChatService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChatRoomModule { }
