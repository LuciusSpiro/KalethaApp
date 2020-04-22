import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { CharacterManagementRoutingModule } from "./characterManagement-routing.module";
import { CharacterManagementComponent } from "./characterManagement.component";
import { CharacterEditComponent } from "./characterEdit/characterEdit.component";
import { CharacterDetailsComponent } from "./characterDetails/characterDetails.component";
import { CharacterEntryComponent } from "./characterEntry/characterEntry.component";
import { CharacterService } from "./character.service";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ListService } from "../services/list.service";
import { SharedModule } from "../components/shared.module";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        CharacterManagementRoutingModule,
        SharedModule
    ],
    declarations: [
        CharacterManagementComponent,
        CharacterEditComponent,
        CharacterDetailsComponent,
        CharacterEntryComponent
    ],
    providers: [
        ListService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class CharacterManagementModule { }
