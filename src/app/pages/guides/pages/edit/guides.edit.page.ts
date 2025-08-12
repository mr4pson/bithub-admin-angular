import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CGuide } from 'src/app/model/entities/guide';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CGuideRepository } from 'src/app/services/repositories/guide.repository';
import { CAuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'guides-edit-page',
	templateUrl: './guides.edit.page.html',	
	styleUrls: [
		"../../../../styles/forms.scss",
		"../../../../styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CGuidesEditPage extends CEntityPage<CGuide> implements OnInit {		
	public homeUrl: string = "/catalogue/guides";
	public requiredFields: string[] = ["name", "content", "contentshort"];	
	public ll: CLang[] = [];

	constructor(		
		protected guideRepository: CGuideRepository,		
		protected appService: CAppService,		
		protected authService: CAuthService,
		protected router: Router,
		protected route: ActivatedRoute,			
		protected langRepository: CLangRepository,
	) 
	{
		super(guideRepository, appService, router);
	}	

	get group_id(): number {return this.authService.authData.group_id;}

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["guides-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.guideRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.ll = await this.langRepository.loadAll();
			this.appService.monitorLog("[guides edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;
		this.errors.content = null;
		this.errors.contentshort = null;
		
		for (let t of this.x.translations) {
			if (!t.name) {
				this.errors.name = "common-error-required-ml";
				error = true;
				break;
			}
		}

		for (let t of this.x.translations) {
			if (!t.content) {
				this.errors.content = "common-error-required-ml";
				error = true;
				break;
			}
		}

		for (let t of this.x.translations) {
			if (!t.contentshort) {
				this.errors.contentshort = "common-error-required-ml";
				error = true;
				break;
			}
		}

		return !error;
	}
}
