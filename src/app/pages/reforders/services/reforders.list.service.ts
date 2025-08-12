import { Injectable } from "@angular/core";
import { CListService } from "src/app/services/list.service";

@Injectable()
export class CRefordersListService extends CListService {
    public sortBy: string = "created_at";
    public sortDir: number = -1;
    public filter = {
        from: undefined,
        to: undefined,
        referrer_email: "",
        referee_email: "",
    };

    public filterChanged(): boolean {
        return this.filter.from !== undefined || this.filter.to !== undefined || this.filter.referrer_email !== "" || this.filter.referee_email !== "";
    }

    public filterReset(): void {
        this.filter = {
            from: undefined,
            to: undefined,
            referrer_email: "",
            referee_email: "",
        };
    } 
}
