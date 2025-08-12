import { Injectable } from '@angular/core';
import { CRepository } from './_repository';
import { CChunk } from 'src/app/model/dto/chunk';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CShopcat } from 'src/app/model/entities/shopcat';
import { CDataService } from '../data.service';

@Injectable()
export class CShopcatRepository extends CRepository<CShopcat> {
    protected entity: string = "CShopcat";
    protected entityML: string = "CShopcatTranslation";

    constructor(protected dataService: CDataService) {
        super(dataService);
    }

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "pos", sortDir: number = 1, filter: any = {}): Promise<CChunk<CShopcat>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};
        return new Promise((resolve, reject) =>
            this.dataService
                .shopcatsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CShopcat>(res.data.map(d => new CShopcat().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error),
                    error: err => reject(err.message),
                }));
    }

    public loadOne(id: number): Promise<CShopcat> {
        return new Promise((resolve, reject) =>
            this.dataService
                .shopcatsOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CShopcat().build(res.data)) : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) =>
            this.dataService
                .shopcatsDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) =>
            this.dataService
                .shopcatsDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public create(x: CShopcat): Promise<CShopcat> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) =>
            this.dataService
                .shopcatsCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CShopcat().build(res.data)) : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public update(x: CShopcat): Promise<CShopcat> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) =>
            this.dataService
                .shopcatsUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CShopcat().build(res.data)) : reject(res.error),
                    error: err => reject(err.message)
                }));
    }
}
