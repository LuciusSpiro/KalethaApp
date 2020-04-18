import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";

import { LoginService } from "./login/login.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate() {
    if (LoginService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["/login"]);

      return false;
    }
  }
}
