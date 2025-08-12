import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CMailing } from 'src/app/model/entities/mailing';
import { CAppService } from 'src/app/services/app.service';
import { CMailingRepository } from 'src/app/services/repositories/mailing.repository';

@Component({
	selector: 'mailings-edit-page',
	templateUrl: './mailings.edit.page.html',
	styleUrls: ["../../../../styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CMailingsEditPage extends CEntityPage<CMailing> implements OnInit {
	public homeUrl: string = "/mailings";
	public requiredFields: string[] = ["name"];

	constructor(
		protected mailingRepository: CMailingRepository,
		protected appService: CAppService,
		protected router: Router,
		private route: ActivatedRoute,
	)
	{
		super(mailingRepository, appService, router);
	}

	public async ngOnInit(): Promise<void> {
		try {
			this.appService.setTitle(`${this.thelang.words["mailings-head"]} - ${this.thelang.words["common-edit"]}`);
			this.x = await this.mailingRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[mailings edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}

	protected validate(): boolean {
		let error = false;
		return !error;
	}
}
