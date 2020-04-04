import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { BrowseRoutingModule } from "./browse-routing.module";
import { BrowseComponent } from "./browse.component";
import { ChatService } from "../services/chat.service";
import { UserService } from "../services/user.service";
import { NativeScriptFormsModule } from "nativescript-angular/forms/forms.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        BrowseRoutingModule
    ],
    declarations: [
        BrowseComponent
    ],
    providers: [
        ChatService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class BrowseModule { }
