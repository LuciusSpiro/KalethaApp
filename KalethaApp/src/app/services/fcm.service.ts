import { getString, setString } from "tns-core-modules/application-settings";
import { Subject } from "rxjs";

export class FcmService {
    static $notification = new Subject<any>();

    static get lastNotification(): any {
        return JSON.parse(getString("lastNotification"));
    }

    static set lastNotification(lastNotification: any) {

        setString("lastNotification", JSON.stringify(lastNotification));
        this.$notification.next(lastNotification);
    }
}
