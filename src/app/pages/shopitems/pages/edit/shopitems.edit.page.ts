import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CShopitem } from 'src/app/model/entities/shopitem';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CShopitemRepository } from 'src/app/services/repositories/shopitem.repository';

@Component({
	selector: 'shopitems-edit-page',
	templateUrl: './shopitems.edit.page.html',
	styleUrls: ["../../../../styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CShopitemsEditPage extends CEntityPage<CShopitem> implements OnInit {
	public homeUrl: string = "/shop/shopitems";
	public requiredFields: string[] = ["name", "img"];
	public ll: CLang[] = [];

	constructor(
		protected shopitemRepository: CShopitemRepository,
		protected appService: CAppService,
		protected router: Router,
		private route: ActivatedRoute,
		private langRepository: CLangRepository,
	)
	{
		super(shopitemRepository, appService, router);
	}

	public async ngOnInit(): Promise<void> {
		try {
			this.appService.setTitle(`${this.thelang.words["shopitems-head"]} - ${this.thelang.words["common-edit"]}`);
			this.x = await this.shopitemRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.ll = await this.langRepository.loadAll();
			this.appService.monitorLog("[shopitems edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;
		this.errors.slug = null;
		this.errors.img = null;

		for (let t of this.x.translations) {
			if (!t.name) {
				this.errors.name = "common-error-required-ml";
				error = true;
				break;
			}
		}

		if (!this.x.img) {
			this.errors.img = "common-error-required";
			error = true;
		}

		return !error;
	}

	public async archive(): Promise<void> {
        try {
            if (confirm(this.thelang.words['common-sure'])) {
                this.reloading = true;
                this.appService.monitorLog(`archiving object: id=${this.x.id}`);
                await this.shopitemRepository.archive(this.x.id);
                this.appService.monitorLog("ok");
                await this.appService.pause(500);
                this.reloading = false;
                this.router.navigateByUrl(this.homeUrl);
            }
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            this.reloading = false;
        }
    }
}
