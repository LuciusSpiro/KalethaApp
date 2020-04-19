import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { Character } from "~/app/models/character.model";
import { CharacterService } from "../character.service";
import { ListService } from "~/app/services/list.service";
import { UserService } from "~/app/services/user.service";

@Component({
    selector: "CharacterEdit",
    templateUrl: "./characterEdit.component.html",
    styleUrls: ["./characterEdit.Component.scss"]
})
export class CharacterEditComponent implements OnInit {
    character: Character;
    characterItName: string;
    classList: Array<string>;
    rangList: Array<string>;
    classDialogOpen: boolean = false;
    rangDialogOpen: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private listService: ListService,
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

        this.classList = this.listService.getClassList();
        this.rangList = this.listService.getRangList();
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

    toggleRangDialog() {
        this.rangDialogOpen = !this.rangDialogOpen;
    }

    toggleClassDialog() {
        this.classDialogOpen = !this.classDialogOpen;
    }

    changeRangTo(newRang: string) {
        this.character.rang = newRang;
    }

    changeClassTo(newClass: string) {
        this.character.class = newClass;
        if (!this.notACivilian()) {
            this.character.rang = "Kalethaner";
        }
    }

    notACivilian() {
        return (this.character.class !== "Zivilist" && this.character.class !== "Diplomat");
    }
}
