import { Component, OnInit } from "@angular/core";
import { Con } from "~/app/models/convention.model";
import { ActivatedRoute } from "@angular/router";
import { ConService } from "~/app/conManagement/convention.service";
import * as app from "tns-core-modules/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
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

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
