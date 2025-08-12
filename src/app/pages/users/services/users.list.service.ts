import { Injectable } from "@angular/core";
import { CListService } from "src/app/services/list.service";

@Injectable()
export class CUsersListService extends CListService {
    public sortBy: string = "created_at";
    public sortDir: number = -1;
    public filter = {
        from: undefined,
        to: undefined,
        name: "",
        email: "",
        parent_id: undefined,
        referrer_id: undefined,
    };

    public filterChanged(): boolean {
        return this.filter.from !== undefined || this.filter.to !== undefined || this.filter.name !== "" || this.filter.email !== "" || this.filter.parent_id !== undefined || this.filter.referrer_id !== undefined;
    }

    public filterReset(): void {
        this.filter = {
            from: undefined,
            to: undefined,
            name: "",
            email: "",
            parent_id: undefined,
            referrer_id: undefined,
        };
    } 
}
