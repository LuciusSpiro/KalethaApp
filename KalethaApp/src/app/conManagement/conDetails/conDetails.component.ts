import { Component, Input } from "@angular/core";


@Component({
    selector: "ConDetails",
    templateUrl: "./conDetails.component.html",
    styleUrls: ["./conDetails.Component.scss"]
})
export class ConDetailsComponent {
    @Input() text: string;
    @Input() from: string;
    @Input() right: boolean;
}
