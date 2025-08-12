import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CPromocode } from 'src/app/model/entities/promocode';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CPromocodeRepository extends CRepository<CPromocode> {
    protected entity: string = "CPromocode";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CPromocode>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .promocodesChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CPromocode>(res.data.map(d => new CPromocode().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CPromocode> {
        return new Promise((resolve, reject) => 
            this.dataService
                .promocodesOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CPromocode().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .promocodesDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .promocodesDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CPromocode): Promise<CPromocode> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .promocodesCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CPromocode().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CPromocode): Promise<CPromocode> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .promocodesUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CPromocode().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
