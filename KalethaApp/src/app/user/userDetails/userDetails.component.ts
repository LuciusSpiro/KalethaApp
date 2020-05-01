import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { UserService } from "~/app/services/user.service";
import { ListService } from "~/app/services/list.service";
import { CharacterService } from "~/app/characterManagement/character.service";
import { Character } from "~/app/models/character.model";
import { Kalethaner } from "~/app/models/kalethaner.model";

@Component({
    selector: "UserDetails",
    templateUrl: "./userDetails.component.html",
    styleUrls: ["./userDetails.Component.scss"]
})
export class UserDetailsComponent implements OnInit {
    userName: string;
    user: Kalethaner = new Kalethaner();
    areaList: Array<string> = [];
    areaDialogOpen: boolean = false;
    editMode: boolean = false;
    characterList: Array<Character> = [];

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private listService: ListService,
        private characterService: CharacterService) { }

    ngOnInit(): void {
        this.userName = this.route.snapshot.params.id;
        this.areaList = this.listService.getAreaList();
        this.userService.getUserByName(this.userName).then((user) => {
            this.user = user;
        });

        this.characterService.getAllCharactersFrom(this.userName).then((chars) => {
            this.characterList = chars;
        });
    }

    toggleAreaDialog(): void {
        this.areaDialogOpen = !this.areaDialogOpen;
    }

    changeAreaTo(newArea: string): void {
        this.user.area = newArea;
    }

    rightsToEdit(): boolean {
        return this.user.level > 4 || this.userService.getCurrentUser().otName === this.user.otName;
    }

    activateEditMode(): void {
        this.editMode = true;
    }

    applyChanges(): void {
        this.userService.updateKalethaner(this.user);
        this.editMode = false;
    }

    dismiss(): void {
        this.userService.getUserByName(this.userName).then((user) => {
            this.user = user;
            this.editMode = false;
        });
    }
}

