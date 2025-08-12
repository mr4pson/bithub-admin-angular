import { Injectable } from "@angular/core";
import { CListService } from "src/app/services/list.service";

@Injectable()
export class CAwardsListService extends CListService {
    public sortBy: string = "date";
    public sortDir: number = -1;      
}
