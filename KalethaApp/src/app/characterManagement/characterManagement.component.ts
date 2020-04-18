import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { CharacterService } from "./character.service";
import { Character } from "../models/character.model";

@Component({
    selector: "CharacterManagement",
    moduleId: module.id,
    templateUrl: "./characterManagement.component.html"
})
export class CharacterManagementComponent implements OnInit {
    cons: Array<Character>;
    constructor(private characterService: CharacterService) { }

    ngOnInit(): void {
        if (!this.cons) {
            this.characterService.init();
        }
    }

    getCharacters(): Array<Character> {
        return this.characterService.characterList;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

}
