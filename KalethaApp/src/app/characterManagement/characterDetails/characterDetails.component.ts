import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CharacterService } from "../character.service";
import { Character } from "~/app/models/character.model";

@Component({
    selector: "CharacterDetails",
    templateUrl: "./characterDetails.component.html",
    styleUrls: ["./characterDetails.Component.scss"]
})
export class CharacterDetailsComponent implements OnInit {
    character: Character;
    characterName: string;

    constructor(private route: ActivatedRoute, private characterService: CharacterService) {
    }

    ngOnInit(): void {
        this.characterName = this.route.snapshot.params.id;
        this.character = this.characterService.getCharacter(this.characterName);
    }
}
