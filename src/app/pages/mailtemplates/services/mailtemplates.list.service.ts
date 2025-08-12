import { Injectable } from "@angular/core";
import { CListService } from "src/app/services/list.service";

@Injectable()
export class CMailtemplatesListService extends CListService {
    public sortBy: string = "name";
}
