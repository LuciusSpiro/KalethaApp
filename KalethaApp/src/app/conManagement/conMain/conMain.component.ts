import { Component, Input, OnInit } from "@angular/core";
import { Con } from "~/app/models/convention.model";
import { ActivatedRoute } from "@angular/router";
import { ConService } from "~/app/services/convention.service";
import { RouterExtensions } from "nativescript-angular/router";


@Component({
    selector: "ConMain",
    templateUrl: "./conMain.component.html",
    styleUrls: ["./conMain.Component.scss"]
})
export class ConMainComponent implements OnInit {
    convention: Con;
    conName: string;

    constructor(private route: ActivatedRoute, private conService: ConService,
        private routerExtensions: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.conName = this.route.snapshot.params.id;
        this.convention = this.conService.getCon(this.conName);
        console.log(this.convention);
    }

}
