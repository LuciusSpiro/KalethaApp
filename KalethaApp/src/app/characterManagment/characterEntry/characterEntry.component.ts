import { Component, Input } from "@angular/core";
import { Character } from "~/app/models/character.model";

@Component({
    selector: "CharacterEntry",
    templateUrl: "./characterEntry.component.html",
    styleUrls: ["./characterEntry.Component.scss"]
})
export class CharacterEntryComponent {
    @Input() character: Character;
}
