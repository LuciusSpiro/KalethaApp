import { Component, NgZone, OnInit } from "@angular/core";
import { KalethaTimeService } from "../services/kalethaTime.service";
import { PushNotificationService } from "../services/pushNotification.service";
import { RouterExtensions } from "nativescript-angular/router";
import { FcmService } from "../services/fcm.service";
import { Router } from "@angular/router";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor(
        private kalethaTimeService: KalethaTimeService,
        private pushNotificationService: PushNotificationService,
        private routerExtensions: RouterExtensions,
        private router: Router,
        private zone: NgZone
    ) { }

    ngOnInit(): void {
        this.pushNotificationService.subscribeToTopic("all");

        FcmService.lastNotification = {};
        FcmService.$notification.subscribe((notification) => {
            const payload = JSON.parse(notification.payload);
            console.log(notification, payload);
            if (payload.sublink) {
                this.zone.run(() => this.routerExtensions.navigate([payload.link, payload.sublink]));
            } else {
                this.zone.run(() => this.routerExtensions.navigate([payload.link]));
            }

        });
    }

    getToday(): string {
        const date = this.kalethaTimeService.getTodayInKaletha();

        return `Wir schreiben den Tag ${date.dies} des Jahres ${date.annus}`;
    }
}
