import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CTariff } from 'src/app/model/entities/tariff';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CTariffRepository } from 'src/app/services/repositories/tariff.repository';

@Component({
	selector: 'tariffs-edit-page',
	templateUrl: './tariffs.edit.page.html',	
	styleUrls: [
		"../../../../styles/forms.scss",
		"../../../../styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CTariffsEditPage extends CEntityPage<CTariff> implements OnInit {		
	public homeUrl: string = "/finances/tariffs";
	public requiredFields: string[] = ["name", "code"];	
	public ll: CLang[] = [];

	constructor(		
		protected tariffRepository: CTariffRepository,		
		protected appService: CAppService,		
		protected router: Router,
		protected route: ActivatedRoute,			
		protected langRepository: CLangRepository,
	) 
	{
		super(tariffRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["tariffs-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.tariffRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.ll = await this.langRepository.loadAll();
			this.appService.monitorLog("[tariffs edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;
		this.errors.code = null;
		
		for (let t of this.x.translations) {
			if (!t.name) {
				this.errors.name = "common-error-required-ml";
				error = true;
				break;
			}
		}

		if (this.x.type === "onetime" && !this.x.code) {
			this.errors.code = "common-error-required";
			error = true;
		}

		return !error;
	}
}
