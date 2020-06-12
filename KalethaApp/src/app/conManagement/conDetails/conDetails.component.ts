import { Component, OnInit } from "@angular/core";
import { Con } from "~/app/models/convention.model";
import { ActivatedRoute } from "@angular/router";
import { ConService } from "~/app/conManagement/convention.service";
import { MemberService } from "../member.service";
import { UserService } from "~/app/services/user.service";
import { Member } from "~/app/models/member.model";
import { ListService } from "~/app/services/list.service";
import { CharacterService } from "~/app/characterManagement/character.service";
import { Character } from "~/app/models/character.model";
import * as utils from "tns-core-modules/utils/utils";

@Component({
    selector: "ConDetails",
    templateUrl: "./conDetails.component.html",
    styleUrls: ["./conDetails.component.scss"]
})
export class ConDetailsComponent implements OnInit {
    convention: Con;
    conName: string;
    currentMember: Member = new Member();
    loadedMember: boolean = false;
    assignList: Array<string>;
    assignDialogOpen: boolean = false;
    characterList: Array<Character> = [];
    characterDialogOpen: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private conService: ConService,
        private memberService: MemberService,
        private userService: UserService,
        private listService: ListService,
        private characterService: CharacterService) { }

    ngOnInit(): void {
        this.conName = this.route.snapshot.params.id;
        this.assignList = this.listService.getAssignList();
        this.convention = this.conService.getCon(this.conName);
        this.characterList = this.characterService.characterList;

        this.currentMember.otName = this.userService.getCurrentUser().otName;
        this.currentMember.conName = this.convention.name;

        this.memberService.getMemberForCon(this.currentMember.otName, this.convention.name)
            .then((member: Member) => {
                if (member) {
                    this.currentMember = member;
                    this.loadedMember = true;
                } else {
                    this.memberService.addMemberToCon(this.currentMember, this.convention.name);
                }
            });
    }

    getAssignmentState(state: string): boolean {
        return this.currentMember.participation === state;
    }

    toggleAssignDialog(): void {
        this.assignDialogOpen = !this.assignDialogOpen;
    }

    toggleCharacterDialog(): void {
        this.characterDialogOpen = !this.characterDialogOpen;
    }

    changeParticipationTo(assign: string): void {
        this.currentMember.participation = assign;
        this.memberService.updateMemberAtCon(this.currentMember, this.convention.name);
    }

    changeCharacterTo(character: Character): void {
        this.currentMember.characterName = character.itName;
        this.memberService.updateMemberAtCon(this.currentMember, this.convention.name);
    }

    openLink(link: string): void {
        utils.openUrl(link);
    }
}
