import { Injectable } from "@angular/core";
import { CListService } from "src/app/services/list.service";

@Injectable()
export class CProposalsListService extends CListService {
    public sortBy: string = "created_at";
    public sortDir: number = -1;
    public filter = {        
        user_id: undefined,
    };

    public filterChanged(): boolean {
        return this.filter.user_id !== undefined;
    }

    public filterReset(): void {
        this.filter = {            
            user_id: undefined,
        };
    } 
}
