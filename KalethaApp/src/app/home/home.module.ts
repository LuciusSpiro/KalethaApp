import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SharedModule } from "../components/shared.module";
import { KalethaTimeService } from "../services/kalethaTime.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        HomeRoutingModule,
        SharedModule
    ],
    declarations: [
        HomeComponent
    ],
    providers: [
        KalethaTimeService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
