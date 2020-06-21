import { Component, OnInit } from "@angular/core";
import { Con } from "~/app/models/convention.model";
import { ConService } from "~/app/conManagement/convention.service";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { PushNotificationService } from "~/app/services/pushNotification.service";

@Component({
    selector: "ConEdit",
    templateUrl: "./conEdit.component.html",
    styleUrls: ["./conEdit.Component.scss"]
})
export class ConEditComponent implements OnInit {
    convention: Con;
    conName: string;
    dateDialogOpen: boolean = false;
    timeDialogOpen: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private conService: ConService,
        private routerExtensions: RouterExtensions,
        private pushService: PushNotificationService) {
    }

    ngOnInit(): void {
        this.conName = this.route.snapshot.params.id;
        if (this.conName === "new") {
            this.convention = new Con();
        } else {
            this.convention = this.conService.getCon(this.conName);
        }
    }

    submit(): void {
        if (this.conName === "new") {
            this.conService.addCon(this.convention);
            const date = this.convention.date.getDate() + "-" +
                this.convention.date.getMonth() + "-" +
                this.convention.date.getFullYear() + " " +
                this.convention.date.getHours() + ":" +
                this.convention.date.getHours();

            this.pushService.triggerPushNotificationForTopic(
                "all", // this.channel,
                "Neuer Termin: " + this.convention.name,
                date,
                {
                    type: "con",
                    link: "./conManagement/details/",
                    sublink: this.convention.name
                }
            );
        } else {
            this.conService.updateCon(this.convention);
        }

        this.routerExtensions.navigate(["./conManagement/main/" + this.convention.name]);
    }

    delete(): void {
        this.conService.deleteCon(this.convention);
        this.routerExtensions.navigate(["./conManagement/"]);
    }

    dismiss(): void {
        this.routerExtensions.back();
    }

    toggleDateDialog(): void {
        this.dateDialogOpen = !this.dateDialogOpen;
    }

    toggleTimeDialog(): void {
        this.timeDialogOpen = !this.timeDialogOpen;
    }
}
