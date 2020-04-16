import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ConManagementRoutingModule } from "./conManagement-routing.module";
import { ConManagementComponent } from "./conManagement.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        ConManagementRoutingModule
    ],
    declarations: [
        ConManagementComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ConManagementModule { }
