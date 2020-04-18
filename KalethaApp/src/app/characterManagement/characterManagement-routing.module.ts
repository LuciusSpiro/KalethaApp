import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { CharacterManagementComponent } from "./characterManagement.component";
import { CharacterEditComponent } from "./characterEdit/characterEdit.component";
import { CharacterDetailsComponent } from "./characterDetails/characterDetails.component";

const routes: Routes = [
    { path: "", component: CharacterManagementComponent },
    { path: "edit/:id", component: CharacterEditComponent },
    { path: "details/:id", component: CharacterDetailsComponent }

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class CharacterManagementRoutingModule { }
