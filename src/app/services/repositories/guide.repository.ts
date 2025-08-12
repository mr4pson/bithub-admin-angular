import { Injectable } from '@angular/core';
import { CChunk } from 'src/app/model/dto/chunk';
import { CGuide } from 'src/app/model/entities/guide';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';

@Injectable()
export class CGuideRepository extends CRepository<CGuide> {
    protected entity: string = "CGuide";
    protected entityML: string = "CGuideTranslation";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }  

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CGuide>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};        
        return new Promise((resolve, reject) => 
            this.dataService
                .guidesChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CGuide>(res.data.map(d => new CGuide().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public loadOne(id: number): Promise<CGuide> {
        return new Promise((resolve, reject) => 
            this.dataService
                .guidesOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CGuide().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .guidesDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .guidesDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public create(x: CGuide): Promise<CGuide> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .guidesCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CGuide().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }

    public update(x: CGuide): Promise<CGuide> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .guidesUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CGuide().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message)
                }));
    }
}
