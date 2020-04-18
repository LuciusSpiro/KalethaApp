import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AuthGuard } from "./auth-guard.service";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "~/app/home/home.module#HomeModule", canActivate: [AuthGuard] },
    { path: "chatRoom", loadChildren: "~/app/chatRoom/chatRoom.module#ChatRoomModule" },
    { path: "conManagement", loadChildren: "~/app/conManagement/conManagement.module#ConManagementModule" },
    {
        path: "characterManagement",
        loadChildren: "~/app/characterManagement/characterManagement.module#CharacterManagementModule"
    },
    { path: "settings", loadChildren: "~/app/settings/settings.module#SettingsModule" },
    { path: "login", loadChildren: "~/app/login/login.module#LoginModule" },
    { path: "user", loadChildren: "~/app/user/user.module#UserModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
