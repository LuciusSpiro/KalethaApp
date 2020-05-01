import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { CharacterEntryComponent } from "./characterEntry.component";
import { SharedModule } from "../../components/shared.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        SharedModule
    ],
    declarations: [
        CharacterEntryComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    exports: [
        CharacterEntryComponent
    ]
})
export class CharacterEntryModule { }
