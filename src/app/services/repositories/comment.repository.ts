import { Injectable } from '@angular/core';
import { CRepository } from './_repository';
import { CChunk } from 'src/app/model/dto/chunk';
import { IGetList } from 'src/app/model/dto/getlist.interface';
import { CComment } from 'src/app/model/entities/comment';
import { CDataService } from '../data.service';

@Injectable()
export class CCommentRepository extends CRepository<CComment> {
    protected entity: string = "CComment";

    constructor(protected dataService: CDataService) {
        super(dataService);
    }

    public loadChunk(part: number = 0, chunkLength: number = 10, sortBy: string = "pos", sortDir: number = 1, filter: any = {}): Promise<CChunk<CComment>> {
        const dto: IGetList = {from: part * chunkLength, q: chunkLength, sortBy, sortDir, filter};
        return new Promise((resolve, reject) =>
            this.dataService
                .commentsChunk(dto)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CChunk<CComment>(res.data.map(d => new CComment().build(d)), res.elementsQuantity, res.pagesQuantity)) : reject(res.error),
                    error: err => reject(err.message),
                }));
    }

    public loadOne(id: number): Promise<CComment> {
        return new Promise((resolve, reject) =>
            this.dataService
                .commentsOne(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CComment().build(res.data)) : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public loadOneWithUser(id: number): Promise<CComment> {
        return new Promise((resolve, reject) =>
            this.dataService
                .commentsOneWithUser(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CComment().build(res.data)) : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public delete(id: number): Promise<void> {
        return new Promise((resolve, reject) =>
            this.dataService
                .commentsDelete(id)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public deleteBulk(ids: number[]): Promise<void> {
        return new Promise((resolve, reject) =>
            this.dataService
                .commentsDeleteBulk(ids)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve() : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public create(x: CComment): Promise<CComment> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) =>
            this.dataService
                .commentsCreate(fd)
                .subscribe({
                    next: res => res.statusCode === 201 ? resolve(new CComment().build(res.data)) : reject(res.error),
                    error: err => reject(err.message)
                }));
    }

    public update(x: CComment): Promise<CComment> {
        const fd = this.buildFormData(x);
        return new Promise((resolve, reject) =>
            this.dataService
                .commentsUpdate(fd)
                .subscribe({
                    next: res => res.statusCode === 200 ? resolve(new CComment().build(res.data)) : reject(res.error),
                    error: err => reject(err.message)
                }));
    }
}
