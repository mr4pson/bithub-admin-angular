import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';
import { CWithdraworder } from 'src/app/model/entities/withdraworder';

@Injectable()
export class CWithdraworderRepository extends CRepository<CWithdraworder> {
  protected entity: string = 'CWithdraworder';

  constructor(protected dataService: CDataService) {
    super(dataService);
  }

  public loadChunk(
    part: number = 0,
    chunkLength: number = 10,
    sortBy: string = 'id',
    sortDir: number = 1,
    filter: any = {}
  ): Promise<CChunk<CWithdraworder>> {
    const dto: IGetList = {
      from: part * chunkLength,
      q: chunkLength,
      sortBy,
      sortDir,
      filter,
    };
    return new Promise((resolve, reject) =>
      this.dataService.withdrawordersChunk(dto).subscribe({
        next: (res) =>
          res.statusCode === 200
            ? resolve(
                new CChunk<CWithdraworder>(
                  res.data.map((d) => new CWithdraworder().build(d)),
                  res.elementsQuantity,
                  res.pagesQuantity
                )
              )
            : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadOne(id: number): Promise<CWithdraworder> {
    return new Promise((resolve, reject) =>
      this.dataService.withdrawordersOne(id).subscribe({
        next: (res) =>
          res.statusCode === 200
            ? resolve(new CWithdraworder().build(res.data))
            : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) =>
      this.dataService.withdrawordersDelete(id).subscribe({
        next: (res) => (res.statusCode === 200 ? resolve() : reject(res.error)),
        error: (err) => reject(err.message),
      })
    );
  }

  public deleteBulk(ids: number[]): Promise<void> {
    return new Promise((resolve, reject) =>
      this.dataService.withdrawordersDeleteBulk(ids).subscribe({
        next: (res) => (res.statusCode === 200 ? resolve() : reject(res.error)),
        error: (err) => reject(err.message),
      })
    );
  }
}
