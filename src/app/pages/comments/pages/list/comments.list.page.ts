import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CCommentRepository } from 'src/app/services/repositories/comment.repository';
import { CAppService } from 'src/app/services/app.service';
import { CCommentsListService } from '../../services/comments.list.service';
import { CComment } from 'src/app/model/entities/comment';

@Component({
	selector: 'comments-list-page',
	templateUrl: './comments.list.page.html',
    styleUrls: ["../../../../styles/lists.scss"],
})
export class CCommentsListPage extends CListPage<CComment> implements OnInit {
    public homeUrl: string = "/catalogue/comments";

    constructor(
        protected commentRepository: CCommentRepository,
        protected appService: CAppService,
        protected listService: CCommentsListService,
    )
    {
        super(commentRepository, appService, listService);
    }

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["comments-head"]);
            await this.initList();
            this.appService.monitorLog("[comments] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}
