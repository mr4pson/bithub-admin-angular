import { Injectable } from '@angular/core';
import { CListService } from 'src/app/services/list.service';

@Injectable()
export class CWithdrawordersListService extends CListService {
  public sortBy: string = 'created_at';
  public sortDir: number = -1;
  public filter = {
    from: undefined,
    to: undefined,
    email: '',
  };

  public filterChanged(): boolean {
    return (
      this.filter.from !== undefined ||
      this.filter.to !== undefined ||
      this.filter.email !== ''
    );
  }

  public filterReset(): void {
    this.filter = {
      from: undefined,
      to: undefined,
      email: '',
    };
  }
}
