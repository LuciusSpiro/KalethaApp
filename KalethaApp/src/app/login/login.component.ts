import { Component } from "@angular/core";
import { User } from "../models/user.model";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";
import { UserService } from "../services/user.service";
import { Kalethaner } from "../models/kalethaner.model";
import { LoginService } from "./login.service";

@Component({
  selector: "login",
  moduleId: module.id,
  templateUrl: "./login.component.html"
})
export class LoginComponent {
  user: User;
  neuerKalethaner: Kalethaner;
  isLoggingIn = true;
  isAuthenticating = false;

  constructor(
    private loginService: LoginService,
    private routerExtensions: RouterExtensions,
    private userService: UserService
  ) {
    this.user = new User();
    this.user.email = "";
    this.user.password = "";

    this.neuerKalethaner = new Kalethaner();
  }

  submit() {
    this.isAuthenticating = true;
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this.loginService.login(this.user)
      .then(() => {
        this.isAuthenticating = false;

        return this.userService.fetchCurrentUser();
      })
      .then(() => {
        this.routerExtensions.navigate(["/"], { clearHistory: true });
      })
      .catch((message: any) => {
        this.isAuthenticating = false;
      });
  }

  signUp() {
    this.loginService.register(this.user)
      .then(() => {
        this.isAuthenticating = false;
        this.toggleDisplay();
        this.userService.addKalethanerToDatabase(this.user.email, this.neuerKalethaner);
      })
      .catch((message: any) => {
        alert(message);
        this.isAuthenticating = false;
      });
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }
}
