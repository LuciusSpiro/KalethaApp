import { Component, NgZone, OnInit } from "@angular/core";
import { KalethaTimeService } from "../services/kalethaTime.service";
import { PushNotificationService } from "../services/pushNotification.service";
import { RouterExtensions } from "nativescript-angular/router";
import { FcmService } from "../services/fcm.service";

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
        private zone: NgZone
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.pushNotificationService.subscribeToTopic("all");

        FcmService.lastNotification = {};
        FcmService.$notification.subscribe((stuff) => {
            if (stuff) {
                this.zone.run(() => this.routerExtensions.navigate(["./chatRoom/"]));
            }

        });
    }

    getToday(): string {
        const date = this.kalethaTimeService.getTodayInKaletha();

        return `Wir schreiben den Tag ${date.dies} des Jahres ${date.annus}`;
    }

    pushTest(): void {
        this.pushNotificationService.triggerPushNotificationForTopic(
            "all", "Spam", "Tja meine Alphatester hier kann ich euch jetzt zu spammne", {}
        );
    }
}
