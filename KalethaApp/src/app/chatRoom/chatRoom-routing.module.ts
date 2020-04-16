import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ChatRoomComponent } from "./chatRoom.component";

const routes: Routes = [
    { path: "", component: ChatRoomComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ChatRoomRoutingModule { }
