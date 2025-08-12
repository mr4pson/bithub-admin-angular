import { Injectable } from '@angular/core';
import { CRepository } from './_repository';
import { CDataService } from '../data.service';
import { CChunk } from 'src/app/model/dto/chunk';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CBaxer } from 'src/app/model/entities/baxer';

@Injectable()
export class CBaxerRepository extends CRepository<CBaxer> {
    protected entity: string = "CBaxer";

    constructor(protected dataService: CDataService) {
        super(dataService);        
    }    

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "id", sortDir: number = 1, filter: any = {}): Promise<CChunk<CBaxer>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};
        return new Promise((resolve, reject) => 
            this.dataService
                .baxersChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CBaxer>(res.data.map(d => new CBaxer().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }

    public loadOne(id: number): Promise<CBaxer> {
        return new Promise((resolve, reject) => 
            this.dataService
                .baxersOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CBaxer().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }    

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .baxersDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) => 
            this.dataService
                .baxersDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }

    public create(x: CBaxer): Promise<CBaxer> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .baxersCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CBaxer().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }

    public update(x: CBaxer): Promise<CBaxer> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) => 
            this.dataService
                .baxersUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CBaxer().build(res.data)) : reject(res.error), 
                    error: err => reject(err.message),
                }));
    }

    /////////////////
    // utils
    /////////////////

    protected buildFormData(x: CBaxer): FormData {
        const fd = new FormData();
        const data = (window as any).structuredClone(x) as CBaxer; // deep copy, to prevent iface reaction for some rebuild :-)

        for (let t of data.translations) {
            if (t.img instanceof File) {
                fd.append(`img[${t.lang_id}]`, t.img);
                t.img = t.img.name; // just in case to prevent strange empty object, and for uniformity
            }
        }
        
        fd.append("data", JSON.stringify(data));
        return fd;
    }
}
