import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CAward } from 'src/app/model/entities/award';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CAwardRepository } from 'src/app/services/repositories/award.repository';

@Component({
	selector: 'awards-edit-page',
	templateUrl: './awards.edit.page.html',	
	styleUrls: ["../../../../styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CAwardsEditPage extends CEntityPage<CAward> implements OnInit {		
	public homeUrl: string = "/misc/awards";
	public requiredFields: string[] = ["name", "img"];	
	public ll: CLang[] = [];

	constructor(		
		protected awardRepository: CAwardRepository,		
		protected appService: CAppService,		
		protected router: Router,
		private route: ActivatedRoute,			
		private langRepository: CLangRepository,
	) 
	{
		super(awardRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["awards-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.awardRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.ll = await this.langRepository.loadAll();
			this.appService.monitorLog("[awards edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;
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
}
