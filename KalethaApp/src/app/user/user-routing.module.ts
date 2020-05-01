import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { UserComponent } from "./user.component";
import { UserDetailsComponent } from "./userDetails/userDetails.component";

const routes: Routes = [
    { path: "", component: UserComponent },
    { path: "details/:id", component: UserDetailsComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class UserRoutingModule { }
