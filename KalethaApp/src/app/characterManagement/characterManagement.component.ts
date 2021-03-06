import { Component } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { CharacterService } from "./character.service";
import { Character } from "../models/character.model";

@Component({
    selector: "CharacterManagement",
    moduleId: module.id,
    templateUrl: "./characterManagement.component.html",
    styleUrls: ["./characterManagement.Component.scss"]
})
export class CharacterManagementComponent {
    constructor(private characterService: CharacterService) { }

    getCharacters(): Array<Character> {
        return this.characterService.characterList;
    }
}
