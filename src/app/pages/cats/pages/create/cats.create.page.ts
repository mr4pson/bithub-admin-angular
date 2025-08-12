import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CCat } from 'src/app/model/entities/cat';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CCatRepository } from 'src/app/services/repositories/cat.repository';

@Component({
	selector: 'cats-create-page',
	templateUrl: './cats.create.page.html',	
	styleUrls: [
		"../../../../styles/forms.scss",
		"../../../../styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CCatsCreatePage extends CEntityPage<CCat> implements OnInit {		
	public homeUrl: string = "/catalogue/cats";
	public requiredFields: string[] = ["name"];	
	public ll: CLang[] = [];

	constructor(		
		protected catRepository: CCatRepository,		
		protected appService: CAppService,		
		protected router: Router,		
		protected langRepository: CLangRepository,     
	) 
	{
		super(catRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["cats-head"]} - ${this.thelang.words["common-create"]}`); 
			this.ll = await this.langRepository.loadAll();
			this.x = new CCat().init(this.ll);					
			this.appService.monitorLog("[cats create] page loaded");
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

