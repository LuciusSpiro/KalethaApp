import { Component, OnInit } from "@angular/core";
import { Con } from "~/app/models/convention.model";
import { ActivatedRoute } from "@angular/router";
import { ConService } from "~/app/conManagement/convention.service";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "ConDetails",
    templateUrl: "./conDetails.component.html",
    styleUrls: ["./conDetails.Component.scss"]
})
export class ConDetailsComponent implements OnInit {
    convention: Con;
    conName: string;

    constructor(private route: ActivatedRoute, private conService: ConService) { }

    ngOnInit(): void {
        this.conName = this.route.snapshot.params.id;
        this.convention = this.conService.getCon(this.conName);
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
