import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CComment } from 'src/app/model/entities/comment';
import { CLang } from 'src/app/model/entities/lang';
import { CCommentRepository } from 'src/app/services/repositories/comment.repository';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';

@Component({
	selector: 'comments-edit-page',
	templateUrl: './comments.edit.page.html',
	styleUrls: [
		"../../../../styles/forms.scss",
		"../../../../styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CCommentsEditPage extends CEntityPage<CComment> implements OnInit {
	public homeUrl: string = "/catalogue/comments";
	public requiredFields: string[] = ["name"];

	constructor(
		protected commentRepository: CCommentRepository,
		protected appService: CAppService,
		protected router: Router,
		protected route: ActivatedRoute,
	)
	{
		super(commentRepository, appService, router);
	}

	public async ngOnInit(): Promise<void> {
		try {
			this.appService.setTitle(`${this.thelang.words["comments-head"]} - ${this.thelang.words["common-edit"]}`);
			this.x = await this.commentRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[comments edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}

	protected validate(): boolean {
		let error = false;
		this.errors.user_id = null;
		this.errors.guide_id = null;
		this.errors.content = null;

		if (!this.x.is_admin && !this.x.user_id) {
			this.errors.user_id = "common-error-required";
			error = true;
		}

		if (!this.x.guide_id) {
			this.errors.guide_id = "common-error-required";
			error = true;
		}

		if (!this.x.content) {
			this.errors.content = "common-error-required";
			error = true;
		}

		return !error;
	}
}

