import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CLinktype } from 'src/app/model/entities/linktype';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CLinktypeRepository extends CRepository<CLinktype> {
    protected entity: string = "CLinktype";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CLinktype>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .linktypesChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CLinktype>(res.data.map(d => new CLinktype().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CLinktype> {
        return new Promise((resolve, reject) => 
            this.dataService
                .linktypesOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CLinktype().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .linktypesDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .linktypesDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CLinktype): Promise<CLinktype> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .linktypesCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CLinktype().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CLinktype): Promise<CLinktype> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .linktypesUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CLinktype().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
