import { Component, OnInit } from "@angular/core";
import { KalethaTimeService } from "../services/kalethaTime.service";


@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    items = [1, 2, 3, 4];
    value = 2;

    constructor(
        private kalethaTimeService: KalethaTimeService
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    getToday(): string {
        const date = this.kalethaTimeService.getTodayInKaletha();

        return `Wir schreiben heute den Tag ${date.dies} des Jahres ${date.annus}`;
    }
}
