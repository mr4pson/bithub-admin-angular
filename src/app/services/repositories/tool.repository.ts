import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CRepository } from './_repository';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CDataService } from '../data.service';
import { CTool } from 'src/app/model/entities/tool';

@Injectable()
export class CToolRepository extends CRepository<CTool> {
  protected entity: string = 'CTool';
  protected entityML: string = 'CToolTranslation';

  constructor(protected dataService: CDataService) {
    super(dataService);
  }

  public loadChunk(
    part: number = 0,
    chunkLength: number = 10,
    sortBy: string = 'id',
    sortDir: number = 1,
    filter: any = {}
  ): Promise<CChunk<CTool>> {
    const dto: IGetList = {
      from: part * chunkLength,
      q: chunkLength,
      sortBy,
      sortDir,
      filter,
    };
    return new Promise((resolve, reject) =>
      this.dataService.toolsChunk(dto).subscribe({
        next: (res) =>
          res.statusCode === 200
            ? resolve(
                new CChunk(
                  res.data.map((d) => new CTool().build(d)),
                  res.elementsQuantity,
                  res.pagesQuantity
                )
              )
            : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public loadOne(id: number): Promise<CTool> {
    return new Promise((resolve, reject) =>
      this.dataService.toolsOne(id).subscribe({
        next: (res) =>
          res.statusCode === 200
            ? resolve(new CTool().build(res.data))
            : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public delete(id: number): Promise<void> {
    return new Promise((resolve, reject) =>
      this.dataService.toolsDelete(id).subscribe({
        next: (res) => (res.statusCode === 200 ? resolve() : reject(res.error)),
        error: (err) => reject(err.message),
      })
    );
  }

  public deleteBulk(ids: number[]): Promise<void> {
    return new Promise((resolve, reject) =>
      this.dataService.toolsDeleteBulk(ids).subscribe({
        next: (res) => (res.statusCode === 200 ? resolve() : reject(res.error)),
        error: (err) => reject(err.message),
      })
    );
  }

  public create(x: CTool): Promise<CTool> {
    const fd = this.buildFormData(x);
    return new Promise((resolve, reject) =>
      this.dataService.toolsCreate(fd).subscribe({
        next: (res) =>
          res.statusCode === 201
            ? resolve(new CTool().build(res.data))
            : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }

  public update(x: CTool): Promise<CTool> {
    const fd = this.buildFormData(x);
    return new Promise((resolve, reject) =>
      this.dataService.toolsUpdate(fd).subscribe({
        next: (res) =>
          res.statusCode === 200
            ? resolve(new CTool().build(res.data))
            : reject(res.error),
        error: (err) => reject(err.message),
      })
    );
  }
}
