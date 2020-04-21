import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as app from "tns-core-modules/application";
import { LoginService } from "./login/login.service";
import { UserService } from "./services/user.service";
import { CharacterService } from "./characterManagement/character.service";

const firebase = require("nativescript-plugin-firebase");

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions,
        private userService: UserService,
        private characterService: CharacterService) {
    }

    ngOnInit(): void {
        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events
            .pipe(filter((event: any) => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);

        this.initFirebase();
    }

    isComponentSelected(url: string): boolean {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            }
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }

    initFirebase(): void {
        firebase.init({
            /*onPushTokenReceivedCallback: function(token) {
              alert("Firebase push token: " + token);
            },*/
            onMessageReceivedCallback(message) {
                alert({
                    title: "Push message: " + (message.title !== undefined ? message.title : ""),
                    message: JSON.stringify(message.body),
                    okButtonText: "W00t!"
                });
            },
            // persist should be set to false as otherwise numbers aren't returned during livesync
            persist: false,
            // storageBucket: 'gs://yowwlr.appspot.com',
            onAuthStateChanged: (data: any) => {
                if (data.loggedIn) {
                    LoginService.token = data.user.uid;
                } else {
                    LoginService.token = "";
                }
            }
        }).then(
            (instance) => {
                console.log("firebase.init done");

                return this.userService.fetchCurrentUser();
            },
            (error) => {
                console.log("firebase.init error: " + error);

                return this.userService.fetchCurrentUser();
            }
        ).then(() => {
            this.characterService.init();
        });
    }

    getKalethanerOTName(): string {
        return this.userService.getCurrentUser().otName;
    }

    logout(): void {
        LoginService.token = "";
        this.onNavItemTap("/login");
    }
}
