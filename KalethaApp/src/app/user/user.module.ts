import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SharedModule } from "../components/shared.module";
import { UserDetailsComponent } from "./userDetails/userDetails.component";
import { CharacterEntryModule } from "../characterManagement/characterEntry/characterEntry.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        UserRoutingModule,
        SharedModule,
        CharacterEntryModule
    ],
    declarations: [
        UserComponent,
        UserDetailsComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UserModule { }
