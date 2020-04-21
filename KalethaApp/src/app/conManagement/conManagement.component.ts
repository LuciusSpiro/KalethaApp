import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ConService } from "./convention.service";
import { Con } from "../models/convention.model";

@Component({
    selector: "conManagement",
    moduleId: module.id,
    templateUrl: "./conManagement.component.html"
})
export class ConManagementComponent implements OnInit {
    cons: Array<Con>;
    constructor(private conService: ConService) { }

    ngOnInit(): void {
        if (!this.cons) {
            this.conService.init();

        }
    }

    getCons(): Array<Con> {
        return this.conService.conList;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
