import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CShopitem } from 'src/app/model/entities/shopitem';
import { CRepository } from './_repository';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CDataService } from '../data.service';

@Injectable()
export class CShopitemRepository extends CRepository<CShopitem> {
    protected entity: string = "CShopitem";
    protected entityML: string = "CShopitemTranslation";

    constructor(protected dataService: CDataService) {
        super(dataService);
    }

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CShopitem>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};
        return new Promise((resolve, reject) =>
            this.dataService
                .shopitemsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk(res.data.map(d => new CShopitem().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CShopitem> {
        return new Promise((resolve, reject) =>
            this.dataService
                .shopitemsOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CShopitem().build(res.data)) : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) =>
            this.dataService
                .shopitemsDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) =>
            this.dataService
                .shopitemsDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public create(x: CShopitem): Promise<CShopitem> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) =>
            this.dataService
                .shopitemsCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CShopitem().build(res.data)) : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public update(x: CShopitem): Promise<CShopitem> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) =>
            this.dataService
                .shopitemsUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CShopitem().build(res.data)) : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public archive(id: number): Promise<void> {
        return new Promise((resolve, reject) =>
            this.dataService
                .shopitemsArchive(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public archiveBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) =>
            this.dataService
                .shopitemsArchiveBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error),
                    error: err => reject(err.message)
                }));
    }
}
