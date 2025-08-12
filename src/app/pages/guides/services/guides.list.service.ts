import { Injectable } from "@angular/core";
import { CListService } from "src/app/services/list.service";

@Injectable()
export class CGuidesListService extends CListService {
    public sortBy: string = "created_at";
    public sortDir: number = -1;
    public filter = {
        from: undefined,
        to: undefined,
        name: "",
        cat_id: undefined,
    };

    public filterChanged(): boolean {
        return this.filter.from !== undefined || this.filter.to !== undefined || this.filter.name !== "" || this.filter.cat_id !== undefined;
    }

    public filterReset(): void {
        this.filter = {
            from: undefined,
            to: undefined,
            name: "",
            cat_id: undefined,
        };
    } 
}
