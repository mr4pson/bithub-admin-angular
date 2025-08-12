import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CShopcat } from 'src/app/model/entities/shopcat';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CShopcatRepository } from 'src/app/services/repositories/shopcat.repository';

@Component({
	selector: 'shopcats-create-page',
	templateUrl: './shopcats.create.page.html',
	styleUrls: [
		"../../../../styles/forms.scss",
		"../../../../styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CShopcatsCreatePage extends CEntityPage<CShopcat> implements OnInit {
	public homeUrl: string = "/shop/shopcats";
	public requiredFields: string[] = ["name"];
	public ll: CLang[] = [];

	constructor(
		protected shopcatRepository: CShopcatRepository,
		protected appService: CAppService,
		protected router: Router,
		protected langRepository: CLangRepository,
	)
	{
		super(shopcatRepository, appService, router);
	}

	public async ngOnInit(): Promise<void> {
		try {
			this.appService.setTitle(`${this.thelang.words["shopcats-head"]} - ${this.thelang.words["common-create"]}`);
			this.ll = await this.langRepository.loadAll();
			this.x = new CShopcat().init(this.ll);
			this.appService.monitorLog("[shopcats create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;

		for (let t of this.x.translations) {
			if (!t.name) {
				this.errors.name = "common-error-required-ml";
				error = true;
				break;
			}
		}

		return !error;
	}
}

