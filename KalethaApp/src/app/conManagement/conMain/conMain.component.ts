import { Component, OnInit } from "@angular/core";
import { Con } from "~/app/models/convention.model";
import { ActivatedRoute } from "@angular/router";
import { ConService } from "~/app/conManagement/convention.service";

@Component({
    selector: "ConMain",
    templateUrl: "./conMain.component.html",
    styleUrls: ["./conMain.component.scss"]
})
export class ConMainComponent implements OnInit {
    convention: Con;
    conName: string;

    constructor(private route: ActivatedRoute, private conService: ConService) {
    }

    ngOnInit(): void {
        this.conName = this.route.snapshot.params.id;
        this.convention = this.conService.getCon(this.conName);
    }
}
