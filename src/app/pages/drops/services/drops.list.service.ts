import { Injectable } from "@angular/core";
import { CListService } from "src/app/services/list.service";

@Injectable()
export class CDropsListService extends CListService {
    public sortBy: string = "id";
    public sortDir: number = -1;
    public filter = {
        name: "",
    };

    public filterChanged(): boolean {
        return this.filter.name !== "";
    }

    public filterReset(): void {
        this.filter = {
            name: "",
        };
    }
}
