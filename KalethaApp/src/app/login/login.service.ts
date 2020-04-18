import { getString, setString } from "tns-core-modules/application-settings";
import { User } from "../models/user.model";

const firebase = require("nativescript-plugin-firebase");

export class LoginService {

  static isLoggedIn(): boolean {
    return !!getString("token");
  }

  static get token(): string {
    return getString("token");
  }

  static set token(theToken: string) {
    setString("token", theToken);
  }

  getMessage() {
    firebase.addOnMessageReceivedCallback((data) => {
      alert(JSON.stringify(data));
    });
  }

  register(user: User) {
    return firebase.createUser({
      email: user.email,
      password: user.password
    }).then(
      (result: any) => {
        return JSON.stringify(result);
      },
      (errorMessage: any) => {
        alert(errorMessage);
      }
    );
  }

  login(user: User) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: user.email,
        password: user.password
      }
    }).then((result: any) => {
      LoginService.token = result.uid;

      return JSON.stringify(result);
    }, (errorMessage: any) => {
      alert(errorMessage);
    });
  }

  logout() {
    LoginService.token = "";
    firebase.logout();
  }
}
