import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CComment } from 'src/app/model/entities/comment';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CCommentRepository } from 'src/app/services/repositories/comment.repository';

@Component({
	selector: 'comments-create-page',
	templateUrl: './comments.create.page.html',
	styleUrls: [
		"../../../../styles/forms.scss",
		"../../../../styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CCommentsCreatePage extends CEntityPage<CComment> implements OnInit {
	public homeUrl: string = "/catalogue/comments";
	public requiredFields: string[] = ["user_id", "guide_id", "content"];

	constructor(
		protected commentRepository: CCommentRepository,
		protected appService: CAppService,
		protected router: Router,
		protected langRepository: CLangRepository,
		protected route: ActivatedRoute,
	)
	{
		super(commentRepository, appService, router);
	}

	public async ngOnInit(): Promise<void> {
		try {
			this.appService.setTitle(`${this.thelang.words["comments-head"]} - ${this.thelang.words["common-create"]}`);
			this.x = new CComment().init();
			const strReplyToId = this.route.snapshot.fragment;

			if (strReplyToId) {
				const replyToId = parseInt(strReplyToId);
				const replyTo = await this.commentRepository.loadOneWithUser(replyToId);
				this.x.guide_id = replyTo.guide_id;
				this.x.is_admin = true;

				if (replyTo.user) {
					const userName = replyTo.user.name?.trim();
					const contentUserName = userName || replyTo.user.email;
					this.x.content = `<strong>${contentUserName}</strong>, `;
				}
			}

			this.appService.monitorLog("[comments create] page loaded");
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

