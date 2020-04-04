import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { UserRoutingModule } from "./user-routing.module";
import { UserComponent } from "./user.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        UserRoutingModule
    ],
    declarations: [
        UserComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class UserModule { }
