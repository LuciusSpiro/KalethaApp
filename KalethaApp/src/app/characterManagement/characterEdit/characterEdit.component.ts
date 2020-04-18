import { Component, OnInit } from "@angular/core";
import { Con } from "~/app/models/convention.model";
import { ConService } from "~/app/conManagement/convention.service";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Character } from "~/app/models/character.model";
import { CharacterService } from "../character.service";

@Component({
    selector: "CharacterEdit",
    templateUrl: "./characterEdit.component.html",
    styleUrls: ["./characterEdit.Component.scss"]
})
export class CharacterEditComponent implements OnInit {
    character: Character;
    characterItName: string;

    constructor(
        private route: ActivatedRoute,
        private characterService: CharacterService,
        private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
        this.characterItName = this.route.snapshot.params.id;
        if (this.characterItName === "new") {
            this.character = new Character();
        } else {
            this.character = this.characterService.getCharacter(this.characterItName);
        }
    }

    submit(): void {
        if (this.characterItName === "new") {
            this.characterService.addCharacter(this.character);
        } else {
            this.characterService.updateCharacter(this.character);
        }

        this.routerExtensions.navigate(["./characterManagement/details/" + this.character.itName]);
    }

    dismiss(): void {
        this.routerExtensions.back();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }
}
