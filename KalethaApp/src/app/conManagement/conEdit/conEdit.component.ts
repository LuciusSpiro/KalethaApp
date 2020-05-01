import { Component, OnInit, NgZone } from "@angular/core";
import { Con } from "~/app/models/convention.model";
import { ConService } from "~/app/conManagement/convention.service";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";

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
    kTime: Date;

    constructor(
        private route: ActivatedRoute,
        private conService: ConService,
        private routerExtensions: RouterExtensions,
        private zone: NgZone) {
    }

    ngOnInit(): void {
        this.conName = this.route.snapshot.params.id;
        if (this.conName === "new") {
            this.convention = new Con();
        } else {
            this.convention = this.conService.getCon(this.conName);
        }

        Object.defineProperty(this, "kDate", {
            get() { return this.convention.date; },
            set(newDate) {
                this.zone.run(() => {
                    let time = this.convention.date;
                    time.setFullYear(newDate.getFullYear());
                    time.setMonth(newDate.getMonth());
                    time.setDate(newDate.getDate());
                    this.convention.date = time;
                    console.log(this.kDate);

                });
            }
        });
    }

    submit(): void {
        if (this.conName === "new") {
            this.conService.addCon(this.convention);
        } else {
            this.conService.updateCon(this.convention);
        }

        this.routerExtensions.navigate(["./conManagement/main/" + this.convention.name]);
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

    changeTime() {
        console.log(this.kTime);
        this.convention.date.setHours(this.kTime.getHours());
        this.convention.date.setMinutes(this.kTime.getMinutes());
    }

    getDate(): Date {
        console.log(this.convention.date);
        return this.convention.date;
    }
}
