import { Component } from "@angular/core";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: "ChatRoom",
    moduleId: module.id,
    templateUrl: "./ChatRoom.component.html"
})
export class ChatRoomComponent {
    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
