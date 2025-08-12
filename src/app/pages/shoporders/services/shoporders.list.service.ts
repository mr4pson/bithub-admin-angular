import { Injectable } from "@angular/core";
import { CListService } from "src/app/services/list.service";

@Injectable()
export class CShopordersListService extends CListService {
    public sortBy: string = "created_at";
    public sortDir: number = -1;
    public filter = {
        from: undefined,
        to: undefined,
        email: "",
        tg: "",
        status: undefined,
    };

    public filterChanged(): boolean {
        return this.filter.from !== undefined || this.filter.to !== undefined || this.filter.email !== "" || this.filter.tg !== "" || this.filter.status !== undefined;
    }

    public filterReset(): void {
        this.filter = {
            from: undefined,
            to: undefined,
            email: "",
            tg: "",
            status: undefined,
        };
    }
}
