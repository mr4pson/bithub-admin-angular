import { Injectable } from "@angular/core";
import { CListService } from "src/app/services/list.service";

@Injectable()
export class CShopitemsListService extends CListService {
    public sortBy: string = "date";
    public sortDir: number = -1;
    public filter = {
        name: "",
        shopcat_id: undefined,
    };

    public filterChanged(): boolean {
        return this.filter.name !== "" || this.filter.shopcat_id !== undefined;
    }

    public filterReset(): void {
        this.filter = {
            name: "",
            shopcat_id: undefined,
        };
    }
}
