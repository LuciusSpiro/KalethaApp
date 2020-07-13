import { Component, OnInit } from "@angular/core";
import { User } from "../models/user.model";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";
import { UserService } from "../services/user.service";
import { Kalethaner } from "../models/kalethaner.model";
import { LoginService } from "./login.service";
import { ListService } from "../services/list.service";

@Component({
  selector: "login",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  user: User;
  newKalethaner: Kalethaner;
  areaList: Array<string> = [];
  isLoggingIn: boolean = true;
  isAuthenticating: boolean = false;
  areaDialogOpen: boolean = false;
  showLogo: boolean = true;

  constructor(
    private loginService: LoginService,
    private routerExtensions: RouterExtensions,
    private listService: ListService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = new User();
    this.newKalethaner = new Kalethaner();
    this.areaList = this.listService.getAreaList();
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
    if (!this.user.email) {
      alert({
        title: "Fehler!",
        message: "Du hast keine Email Addresse angegeben",
        okButtonText: "Verzeihe, ich werde meinen Fehler beheben."
      });
    } else if (!this.user.password) {
      alert({
        title: "Fehler!",
        message: "Passwort eingeben! Ho!",
        okButtonText: "AYE!"
      });
    } else {
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
  }

  signUp() {
    if (!this.newKalethaner.otName) {
      alert({
        title: "Fehler!",
        message: "Dein Name fehlt.",
        okButtonText: "Ich werde ihn eintragen"
      });
    } else if (!this.user.email) {
      alert({
        title: "Fehler!",
        message: "Dein Email Addresse fehlt.",
        okButtonText: "Ich werde immer das ganze Formular"
      });
    } else if (!this.user.password) {
      alert({
        title: "Fehler!",
        message: "Sei kein Dummi nutz ein...",
        okButtonText: "Passwort!"
      });
    } else {
      this.loginService.register(this.user)
        .then(() => {
          this.isAuthenticating = false;
          this.toggleDisplay();
          this.newKalethaner.eMail = this.user.email;
          this.userService.addKalethanerToDatabase(this.newKalethaner);
        })
        .catch((message: any) => {
          alert(message);
          this.isAuthenticating = false;
        });
    }
  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  toggleAreaDialog(): void {
    this.areaDialogOpen = !this.areaDialogOpen;
  }

  changeAreaTo(newArea: string): void {
    this.newKalethaner.area = newArea;
  }

  toggleLogo(): void {
    this.showLogo = !this.showLogo;
  }
}
