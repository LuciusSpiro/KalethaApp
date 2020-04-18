import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ChatService } from "./chat.service";
import { NativeScriptFormsModule } from "nativescript-angular/forms/forms.module";
import { MessageComponent } from "./message/message.component";
import { ChatComponent } from "./chat.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule
    ],
    declarations: [
        MessageComponent,
        ChatComponent
    ],
    providers: [
        ChatService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [
        ChatComponent
    ]
})

export class ChatModule { }
