import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CharacterService } from "../character.service";
import { Character } from "~/app/models/character.model";
import { UserService } from "~/app/services/user.service";

@Component({
    selector: "CharacterDetails",
    templateUrl: "./characterDetails.component.html",
    styleUrls: ["./characterDetails.Component.scss"]
})
export class CharacterDetailsComponent implements OnInit {
    character: Character;
    characterName: string;

    constructor(
        private route: ActivatedRoute,
        private characterService: CharacterService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.characterName = this.route.snapshot.params.id;

        this.character = this.characterService.getCharacter(this.characterName);
        if (!this.character) {
            this.characterService.getCharacterByName(this.characterName).then((character) => {
                this.character = character;
            });
        }
    }

    getOtName(): string {
        return this.userService.getCurrentUser().otName;
    }
}
