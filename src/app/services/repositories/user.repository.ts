import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CUser } from 'src/app/model/entities/user';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CUserRepository extends CRepository<CUser> {
    protected entity: string = "CUser";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CUser>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .usersChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CUser>(res.data.map(d => new CUser().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CUser> {
        return new Promise((resolve, reject) => 
            this.dataService
                .usersOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CUser().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .usersDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .usersDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CUser): Promise<CUser> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .usersCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CUser().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CUser): Promise<CUser> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .usersUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CUser().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
