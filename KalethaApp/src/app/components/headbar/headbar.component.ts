import { Component, Input } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "Headbar",
    templateUrl: "./headbar.component.html",
    styleUrls: ["./headbar.Component.scss"]
})
export class HeadbarComponent {
    @Input() headline: string;

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
