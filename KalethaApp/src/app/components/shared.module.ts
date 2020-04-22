import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { HeadbarComponent } from "./headbar/headbar.component";
import { NativeScriptCommonModule } from "nativescript-angular/common";

@NgModule({
    imports: [
        NativeScriptCommonModule
    ],
    declarations: [
        HeadbarComponent
    ],
    exports: [
        HeadbarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class SharedModule { }
