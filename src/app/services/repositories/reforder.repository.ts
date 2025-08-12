import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CReforder } from 'src/app/model/entities/reforder';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CReforderRepository extends CRepository<CReforder> {
    protected entity: string = "CReforder";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CReforder>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .refordersChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CReforder>(res.data.map(d => new CReforder().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CReforder> {
        return new Promise((resolve, reject) => 
            this.dataService
                .refordersOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CReforder().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .refordersDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .refordersDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
