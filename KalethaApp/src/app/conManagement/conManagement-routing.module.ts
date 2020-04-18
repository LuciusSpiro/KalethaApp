import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ConManagementComponent } from "./conManagement.component";
import { ConEditComponent } from "./conEdit/conEdit.component";
import { ConMainComponent } from "./conMain/conMain.component";
import { ConDetailsComponent } from "./conDetails/conDetails.component";

const routes: Routes = [
    { path: "", component: ConManagementComponent },
    { path: "edit/:id", component: ConEditComponent },
    { path: "main/:id", component: ConMainComponent },
    { path: "details/:id", component: ConDetailsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ConManagementRoutingModule { }
