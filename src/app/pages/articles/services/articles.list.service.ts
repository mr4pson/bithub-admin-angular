import { Injectable } from "@angular/core";
import { CListService } from "src/app/services/list.service";

@Injectable()
export class CArticlesListService extends CListService {
    public sortBy: string = "date";
    public sortDir: number = -1;
    public filter = {
        name: "",
        artcat_id: undefined,
    };

    public filterChanged(): boolean {
        return this.filter.name !== "" || this.filter.artcat_id !== undefined;
    }

    public filterReset(): void {
        this.filter = {
            name: "",
            artcat_id: undefined,
        };
    }     
}
