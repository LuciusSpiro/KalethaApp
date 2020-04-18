import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { ConService } from "../conManagement/convention.service";
import { Con } from "../models/convention.model";

@Component({
    selector: "CharacterManagement",
    moduleId: module.id,
    templateUrl: "./characterManagement.component.html"
})
export class CharacterManagementComponent implements OnInit {
    cons: Array<Con>;
    constructor(private conService: ConService) {
        // Use the component constructor to inject providers.
    }

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
