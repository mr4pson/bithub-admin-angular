import { Injectable } from '@angular/core';
import { CRepository } from './_repository';
import { CChunk } from 'src/app/model/dto/chunk';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CArtcat } from 'src/app/model/entities/artcat';
import { CDataService } from '../data.service';

@Injectable()
export class CArtcatRepository extends CRepository<CArtcat> {
    protected entity: string = "CArtcat";
    protected entityML: string = "CArtcatTranslation";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "pos", sortDir: number = 1, filter: any = {}): Promise<CChunk<CArtcat>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};
        return new Promise((resolve, reject) =>             
            this.dataService
                .artcatsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CArtcat>(res.data.map(d => new CArtcat().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }

    public loadOne(id: number): Promise<CArtcat> {
        return new Promise((resolve, reject) => 
            this.dataService
                .artcatsOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CArtcat().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .artcatsDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .artcatsDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CArtcat): Promise<CArtcat> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .artcatsCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CArtcat().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CArtcat): Promise<CArtcat> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .artcatsUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CArtcat().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
