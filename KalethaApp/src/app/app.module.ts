import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginService } from "./login/login.service";
import { UserService } from "./services/user.service";
import { CharacterService } from "./characterManagement/character.service";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { PushNotificationService } from "./services/pushNotification.service";
import { FcmService } from "./services/fcm.service";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        NativeScriptHttpClientModule
    ],
    providers: [
        LoginService,
        UserService,
        CharacterService,
        PushNotificationService
    ],
    declarations: [
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
