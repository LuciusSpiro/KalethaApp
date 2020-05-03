import { Component, OnInit } from "@angular/core";
import { Con } from "~/app/models/convention.model";
import { ActivatedRoute } from "@angular/router";
import { ConService } from "~/app/conManagement/convention.service";
import { MemberService } from "../member.service";
import { Member } from "~/app/models/member.model";

@Component({
    selector: "ConMain",
    templateUrl: "./conMain.component.html",
    styleUrls: ["./conMain.component.scss"]
})
export class ConMainComponent implements OnInit {
    convention: Con;
    conName: string;
    memberList: Array<Member> = [];

    constructor(
        private route: ActivatedRoute,
        private conService: ConService,
        private memberService: MemberService
    ) { }

    ngOnInit(): void {
        this.conName = this.route.snapshot.params.id;
        this.convention = this.conService.getCon(this.conName);
        this.memberService.getAllMembersForCon(this.conName).then((memberList) => {
            this.memberList = memberList;
        });
    }

    getAmountOfMember(): number {
        return this.memberList.filter((entry) => entry.participation === "Dabei").length || 0;
    }
}
