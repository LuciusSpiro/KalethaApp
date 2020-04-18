import { Component, OnInit } from "@angular/core";
import { Con } from "~/app/models/convention.model";
import { ConService } from "~/app/conManagement/convention.service";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

@Component({
    selector: "CharacterEdit",
    templateUrl: "./characternEdit.component.html",
    styleUrls: ["./characterEdit.Component.scss"]
})
export class CharacterEditComponent implements OnInit {
    convention: Con;
    conName: string;

    constructor(
        private route: ActivatedRoute,
        private conService: ConService,
        private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.conName = this.route.snapshot.params.id;
        if (this.conName === "new") {
            this.convention = new Con();
        } else {
            this.convention = this.conService.getCon(this.conName);
        }
    }

    submit(): void {
        if (this.conName === "new") {
            this.conService.addCon(this.convention);
        } else {
            this.conService.updateCon(this.convention);
        }

        this.routerExtensions.navigate(["./conManagement/main/" + this.convention.name]);
    }

    dismiss(): void {
        this.routerExtensions.back();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
