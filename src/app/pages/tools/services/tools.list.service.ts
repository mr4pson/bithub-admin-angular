import { Injectable } from '@angular/core';
import { CListService } from 'src/app/services/list.service';

@Injectable()
export class CToolsListService extends CListService {
  public sortBy: string = 'date';
  public sortDir: number = -1;
  public filter = {
    name: '',
    tolcat_id: undefined,
  };

  public filterChanged(): boolean {
    return this.filter.name !== '' || this.filter.tolcat_id !== undefined;
  }

  public filterReset(): void {
    this.filter = {
      name: '',
      tolcat_id: undefined,
    };
  }
}
