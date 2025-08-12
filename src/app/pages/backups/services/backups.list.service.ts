import { Injectable } from "@angular/core";
import { CListService } from "src/app/services/list.service";

@Injectable()
export class BackupsListService extends CListService {
    public sortBy: string = "created_at";    
    public sortDir: number = -1;
}
