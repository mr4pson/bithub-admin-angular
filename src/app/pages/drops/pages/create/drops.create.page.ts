import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CDrop } from 'src/app/model/entities/drop';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CDropRepository } from 'src/app/services/repositories/drop.repository';

@Component({
	selector: 'drops-create-page',
	templateUrl: './drops.create.page.html',
	styleUrls: ["../../../../styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CDropsCreatePage extends CEntityPage<CDrop> implements OnInit {
	public homeUrl: string = "/misc/drops";
	public requiredFields: string[] = ["name", "img"];
	public ll: CLang[] = [];

	constructor(
		protected dropRepository: CDropRepository,
		protected appService: CAppService,
		protected router: Router,
		private langRepository: CLangRepository,
	)
	{
		super(dropRepository, appService, router);
	}

	public async ngOnInit(): Promise<void> {
		try {
			this.appService.setTitle(`${this.thelang.words["drops-head"]} - ${this.thelang.words["common-create"]}`);
			this.ll = await this.langRepository.loadAll();
			this.x = new CDrop().init(this.ll);
			this.appService.monitorLog("[drops create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;
		this.errors.img = null;

		if (!this.x.name) {
			this.errors.name = "common-error-required";
			error = true;
		}

		if (!this.x.img) {
			this.errors.img = "common-error-required";
			error = true;
		}

		return !error;
	}
}

