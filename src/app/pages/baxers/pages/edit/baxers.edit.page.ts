import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CBaxer } from 'src/app/model/entities/baxer';
import { CBaxerRepository } from 'src/app/services/repositories/baxer.repository';
import { CAppService } from 'src/app/services/app.service';
import { CLang } from 'src/app/model/entities/lang';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';

@Component({
	selector: 'baxers-edit-page',
	templateUrl: './baxers.edit.page.html',
	styleUrls: ["../../../../styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,	
})
export class CBaxersEditPage extends CEntityPage<CBaxer> implements OnInit {	
	public homeUrl: string = "/misc/baxers";
	public requiredFields: string[] = ["img"];	
	public ll: CLang[] = [];

	constructor(		
		protected baxerRepository: CBaxerRepository,
		protected appService: CAppService,		
		protected router: Router,
		protected route: ActivatedRoute,	
		protected langRepository: CLangRepository,
	) 
	{
		super(baxerRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {				
			this.appService.setTitle(`${this.thelang.words["baxers-head"]} - ${this.thelang.words["common-edit"]}`); 
			this.x = await this.baxerRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.ll = await this.langRepository.loadAll();	
			this.appService.monitorLog("[baxers edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	
	
	protected validate(): boolean {
		let error = false;
		this.errors.img = null;

		for (let t of this.x.translations) {
			if (!t.img) {
				this.errors.img = "common-error-required-ml";
				error = true;
				break;
			}
		}	

		return !error;
	}
}
