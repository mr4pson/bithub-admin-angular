import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CAward } from 'src/app/model/entities/award';
import { CRepository } from './_repository';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CDataService } from '../data.service';

@Injectable()
export class CAwardRepository extends CRepository<CAward> {
    protected entity: string = "CAward";
    protected entityML: string = "CAwardTranslation";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CAward>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .awardsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk(res.data.map(d => new CAward().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CAward> {
        return new Promise((resolve, reject) => 
            this.dataService
                .awardsOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CAward().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .awardsDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .awardsDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CAward): Promise<CAward> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .awardsCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CAward().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CAward): Promise<CAward> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .awardsUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CAward().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
