import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CMailing } from 'src/app/model/entities/mailing';
import { CAppService } from 'src/app/services/app.service';
import { CMailingRepository } from 'src/app/services/repositories/mailing.repository';

@Component({
	selector: 'mailings-create-page',
	templateUrl: './mailings.create.page.html',
	styleUrls: ["../../../../styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CMailingsCreatePage extends CEntityPage<CMailing> implements OnInit {
	public homeUrl: string = "/mailings";
	public requiredFields: string[] = ["name"];

	constructor(
		protected mailingRepository: CMailingRepository,
		protected appService: CAppService,
		protected router: Router,
	)
	{
		super(mailingRepository, appService, router);
	}

	public async ngOnInit(): Promise<void> {
		try {
			this.appService.setTitle(`${this.thelang.words["mailings-head"]} - ${this.thelang.words["common-create"]}`);
			this.x = new CMailing().init();
			this.appService.monitorLog("[mailings create] page loaded");
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

