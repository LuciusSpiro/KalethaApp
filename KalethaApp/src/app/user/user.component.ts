import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";
import { Kalethaner } from "../models/kalethaner.model";

/* ***********************************************************
* Before you can navigate to this page from your app, you need to reference this page's module in the
* global app router module. Add the following object to the global array of routes:
* { path: "user", loadChildren: "./user/user.module#UserModule" }
* Note that this simply points the path to the page module file. If you move the page, you need to update the route too.
*************************************************************/

@Component({
    selector: "User",
    moduleId: module.id,
    templateUrl: "./user.component.html"
})
export class UserComponent implements OnInit {
    kalethaner: Kalethaner;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.kalethaner = this.userService.getCurrentUser();
    }

}
