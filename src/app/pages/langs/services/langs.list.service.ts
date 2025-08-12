import { Injectable } from "@angular/core";
import { CListService } from "src/app/services/list.service";

@Injectable()
export class CLangsListService extends CListService {
    public sortBy: string = "pos";
}
