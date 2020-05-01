import { Component, OnInit, NgZone } from "@angular/core";
import { UserService } from "../services/user.service";
import { Kalethaner } from "../models/kalethaner.model";
import { Subject } from "rxjs";

@Component({
    selector: "User",
    moduleId: module.id,
    templateUrl: "./user.component.html"
})
export class UserComponent implements OnInit {
    $kalethaner: Subject<Array<Kalethaner>>;
    neueNachricht: string;

    constructor(private userService: UserService, private zone: NgZone) {

    }

    ngOnInit(): void {
        this.$kalethaner = new Subject<Array<Kalethaner>>();

        this.userService.subscribeToUser((snapshot) => {
            const kalethaner = [];
            snapshot.forEach((doc) => {
                kalethaner.push(doc.data());
            });

            this.zone.run(() => this.$kalethaner.next(kalethaner));
        });
    }
}
