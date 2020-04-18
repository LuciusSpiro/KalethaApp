import { Component, Input } from "@angular/core";
import { Con } from "~/app/models/convention.model";

@Component({
    selector: "ConEntry",
    templateUrl: "./conEntry.component.html",
    styleUrls: ["./conEntry.Component.scss"]
})
export class ConEntryComponent {
    @Input() con: Con;
}
