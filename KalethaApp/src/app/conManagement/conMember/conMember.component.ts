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

@Component({
    selector: "ConMember",
    templateUrl: "./conMember.component.html",
    styleUrls: ["./conMember.component.scss"]
})
export class ConMemberComponent implements OnInit {
    convention: Con;
    conName: string;
    currentMember: Member = new Member();
    loadedMember: boolean = false;
    assignList: Array<string>;
    assignDialogOpen: boolean = false;
    characterList: Array<Character> = [];
    characterDialogOpen: boolean = false;
    memberList: Array<Member> = [];

    constructor(
        private route: ActivatedRoute,
        private memberService: MemberService,
        private userService: UserService,
        private listService: ListService,
        private characterService: CharacterService) { }

    ngOnInit(): void {
        this.conName = this.route.snapshot.params.id;
        this.assignList = this.listService.getAssignList();
        this.characterList = this.characterService.characterList;

        this.currentMember.otName = this.userService.getCurrentUser().otName;
        this.currentMember.conName = this.conName;

        this.memberService.getAllMembersForCon(this.conName).then((memberList) => {
            this.memberList = memberList;
        });

        this.memberService.getMemberForCon(this.currentMember.otName, this.conName)
            .then((member: Member) => {
                if (member) {
                    this.currentMember = member;
                    this.loadedMember = true;
                } else {
                    this.memberService.addMemberToCon(this.currentMember, this.conName);
                }
            });
    }

    getAssignmentState(state: string): boolean {
        return this.currentMember.participation === state;
    }

    toggleAssignDialog() {
        this.assignDialogOpen = !this.assignDialogOpen;
    }

    toggleCharacterDialog() {
        this.characterDialogOpen = !this.characterDialogOpen;
    }

    changeParticipationTo(assign: string) {
        this.currentMember.participation = assign;
        this.memberService.updateMemberAtCon(this.currentMember, this.conName);
    }

    changeCharacterTo(character: Character) {
        this.currentMember.characterName = character.itName;
        this.memberService.updateMemberAtCon(this.currentMember, this.conName);
    }
}
