import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { ConManagementRoutingModule } from "./conManagement-routing.module";
import { ConManagementComponent } from "./conManagement.component";
import { ConEditComponent } from "./conEdit/conEdit.component";
import { ConMainComponent } from "./conMain/conMain.component";
import { ConEntryComponent } from "./conEntry/conEntry.component";
import { ConDetailsComponent } from "./conDetails/conDetails.component";
import { ConService } from "./convention.service";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ChatModule } from "../components/chat/chat.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ConManagementRoutingModule,
        ChatModule
    ],
    declarations: [
        ConManagementComponent,
        ConEditComponent,
        ConMainComponent,
        ConEntryComponent,
        ConDetailsComponent
    ],
    providers: [
        ConService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ConManagementModule { }
