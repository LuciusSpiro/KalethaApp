import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Character } from "../models/character.model";
import { UserService } from "../services/user.service";

const firebase = require("nativescript-plugin-firebase");

@Injectable({
    providedIn: "root"
})
export class CharacterService {
    $characters: Subject<Array<Character>>;
    characterList: Array<Character>;
    isInitiated: boolean = false;

    constructor(
        private userService: UserService
    ) {

    }

    init(): void {
        if (!this.isInitiated) {
            this.$characters = new Subject();
            this.getAllCharacters().then((characters) => {
                this.$characters.next(characters);
            });
            this.$characters.subscribe((characters: Array<Character>) => this.characterList = characters);
            this.subscribeToCharacterCollection((snapshot) => {
                const characters = [];
                snapshot.forEach((doc) => {
                    characters.push(doc.data());
                });

                this.$characters.next(characters);
            });
            this.isInitiated = true;
        }
    }

    subscribeToCharacterCollection(callBack: any): void {
        firebase.firestore.collection("Character")
            .where("otName", "==", this.userService.getCurrentUser().otName)
            .onSnapshot(callBack);
    }

    getCharacter(itName: string): Character {
        return this.characterList.find((character) => character.itName === itName);
    }

    getAllCharacters(): Promise<Array<Character>> {
        return firebase.firestore.collection("Character")
            .where("otName", "==", this.userService.getCurrentUser().otName)
            .get({ source: "server" })
            .then((querySnapshot) => {
                const characters = [];
                querySnapshot.forEach((doc) => {
                    characters.push(doc.data());
                });

                return characters;
            });
    }

    getAllCharactersFrom(name: string): Promise<Array<Character>> {
        return firebase.firestore.collection("Character")
            .where("otName", "==", name)
            .get({ source: "server" })
            .then((querySnapshot) => {
                const characters = [];
                querySnapshot.forEach((doc) => {
                    characters.push(doc.data());
                });

                return characters;
            });
    }

    addCharacter(character: Character): void {
        if (!character.itName) {
            return;
        }
        character.otName = this.userService.getCurrentUser().otName;
        this.characterList.push(character);
        firebase.firestore.collection("Character").doc(character.itName).set(character);
    }

    updateCharacter(character: Character): void {
        this.characterList.map((entry) => {
            if (entry.itName === character.itName) {
                entry = character;
            }

            return entry;
        });
        firebase.firestore.collection("Character").doc(character.itName).update(character);
    }

    deleteCharacter(character: Character): void {
        this.characterList = this.characterList.filter((entry) => entry.itName !== character.itName);
        firebase.firestore.collection("Character").doc(character.itName).delete();
    }

}
