import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CMailing } from 'src/app/model/entities/mailing';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CMailingRepository extends CRepository<CMailing> {
  protected entity: string = 'CMailing';

  constructor(protected dataService: CDataService) {
    super(dataService);
  }

  public loadChunk(
    part: number = 0,
    chunkLength: number = 10,
    sortBy: string = 'id',
    sortDir: number = 1,
    filter: any = {}
  ): Promise<CChunk<CMailing>> {
    const dto: IGetList = {
      from: part * chunkLength,
      q: chunkLength,
      sortBy,
      sortDir,
      filter,
    };
    return new Promise((resolve, reject) =>
      this.dataService.mailingsChunk(dto).subscribe({
        next: (res) =>
          res.statusCode === 200
            ? resolve(
                new CChunk<CMailing>(
                  res.data.map((d) => new CMailing().build(d)),
                  res.elementsQuantity,
                  res.pagesQuantity
                )
              )
            : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadOne(id: number): Promise<CMailing> {
    return new Promise((resolve, reject) =>
      this.dataService.mailingsOne(id).subscribe({
        next: (res) =>
          res.statusCode === 200
            ? resolve(new CMailing().build(res.data))
            : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadOneShort(id: number): Promise<CMailing> {
    return new Promise((resolve, reject) =>
      this.dataService.mailingsOneShort(id).subscribe({
        next: (res) =>
          res.statusCode === 200
            ? resolve(new CMailing().build(res.data))
            : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) =>
      this.dataService.mailingsDelete(id).subscribe({
        next: (res) => (res.statusCode === 200 ? resolve() : reject(res.error)),
        error: (err) => reject(err.message),
      })
    );
  }

  public deleteBulk(ids: number[]): Promise<void> {
    return new Promise((resolve, reject) =>
      this.dataService.mailingsDeleteBulk(ids).subscribe({
        next: (res) => (res.statusCode === 200 ? resolve() : reject(res.error)),
        error: (err) => reject(err.message),
      })
    );
  }

  public create(x: CMailing): Promise<CMailing> {
    const fd = this.buildFormData(x);
    return new Promise((resolve, reject) =>
      this.dataService.mailingsCreate(fd).subscribe({
        next: (res) =>
          res.statusCode === 201
            ? resolve(new CMailing().build(res.data))
            : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public update(x: CMailing): Promise<CMailing> {
    const fd = this.buildFormData(x);
    return new Promise((resolve, reject) =>
      this.dataService.mailingsUpdate(fd).subscribe({
        next: (res) =>
          res.statusCode === 200
            ? resolve(new CMailing().build(res.data))
            : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public run(id: number): Promise<void> {
    return new Promise((resolve, reject) =>
      this.dataService.mailingsRun(id).subscribe({
        next: (res) => (res.statusCode === 200 ? resolve() : reject(res.error)),
        error: (err) => reject(err.message),
      })
    );
  }

  public runForAll(id: number): Promise<void> {
    return new Promise((resolve, reject) =>
      this.dataService.mailingsRunForAll(id).subscribe({
        next: (res) => (res.statusCode === 200 ? resolve() : reject(res.error)),
        error: (err) => reject(err.message),
      })
    );
  }
}
