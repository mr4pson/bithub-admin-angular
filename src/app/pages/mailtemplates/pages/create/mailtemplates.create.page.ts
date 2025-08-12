import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CMailtemplate } from 'src/app/model/entities/mailtemplate';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CMailtemplateRepository } from 'src/app/services/repositories/mailtemplate.repository';

@Component({
	selector: 'mailtemplates-create-page',
	templateUrl: './mailtemplates.create.page.html',	
	styleUrls: ["../../../../styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CMailtemplatesCreatePage extends CEntityPage<CMailtemplate> implements OnInit {		
	public homeUrl: string = "/mailtemplates";
	public requiredFields: string[] = ["name"];	
	public ll: CLang[] = [];

	constructor(		
		protected mailtemplateRepository: CMailtemplateRepository,		
		protected appService: CAppService,		
		protected router: Router,		
		private langRepository: CLangRepository,     
	) 
	{
		super(mailtemplateRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["mailtemplates-head"]} - ${this.thelang.words["common-create"]}`); 
			this.ll = await this.langRepository.loadAll();
			this.x = new CMailtemplate().init(this.ll);	
			this.appService.monitorLog("[mailtemplates create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;

		if (!this.x.name) {
			this.errors.name = "common-error-required";
			error = true;
		}

		return !error;
	}
}

