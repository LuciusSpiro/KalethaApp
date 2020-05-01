import { Component, Input } from "@angular/core";
import { Character } from "~/app/models/character.model";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "CharacterEntry",
    templateUrl: "./characterEntry.component.html",
    styleUrls: ["./characterEntry.Component.scss"]
})
export class CharacterEntryComponent {
    @Input() character: Character;
    constructor(private routerExtensions: RouterExtensions) { }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });
    }
}
