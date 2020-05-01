import { Injectable } from "@angular/core";
import { KalethaDate } from "../models/kalethaDate.model";

@Injectable()
export class KalethaTimeService {

    getKalethaTime(date: Date): KalethaDate {
        const refDate = new Date("05/01/2020"); // 1.366
        const schaltyear = date.getFullYear() % 4 === 0;
        const newYear = new Date(`01/01/${date.getFullYear()}`);

        const differenceInDays = (date.getTime() - newYear.getTime()) / (1000 * 3600 * 24);
        let dies = 0;
        let annus = 0;
        if (schaltyear) {
            dies = differenceInDays >= 121 ? differenceInDays - 120 : 246 + differenceInDays;
            const rawYears = date.getFullYear() - refDate.getFullYear() + 366;
            annus = differenceInDays >= 121 ? rawYears : rawYears - 1;
        } else {
            dies = differenceInDays >= 120 ? differenceInDays - 119 : 246 + differenceInDays;
            const rawYears = date.getFullYear() - refDate.getFullYear() + 366;
            annus = differenceInDays >= 120 ? rawYears : rawYears - 1;
        }

        dies = Math.floor(dies);
        annus = Math.floor(annus);

        return { dies, annus };
    }

    getTodayInKaletha(): KalethaDate {
        return this.getKalethaTime(new Date());
    }

}
