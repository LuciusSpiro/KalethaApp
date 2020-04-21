import { Injectable } from "@angular/core";
import { Member } from "../models/member.model";
import { Con } from "../models/convention.model";

const firebase = require("nativescript-plugin-firebase");

@Injectable({
    providedIn: "root"
})
export class MemberService {
    memberCollection = firebase.firestore.collection("Member");

    getAllMembersForCon(conName: string): Promise<Array<Member>> {
        return this.memberCollection
            .where("conName", "==", conName)
            .get({ source: "server" })
            .then((querySnapshot) => {
                const characters = [];
                querySnapshot.forEach((doc) => {
                    characters.push(doc.data());
                });

                return characters;
            });
    }

    getMemberForCon(otName: string, conName: string): Promise<Member> {
        return this.memberCollection.doc(conName + " " + otName)
            .get({ source: "server" })
            .then((doc) => {
                return doc.data();
            });
    }

    addMemberToCon(member: Member, convention: Con): void {
        this.memberCollection.doc(convention.name + " " + member.otName).set(member);

    }

    updateMemberAtCon(member: Member, convention: Con): void {
        this.memberCollection.doc(convention.name + " " + member.otName).update(member);
    }
}
