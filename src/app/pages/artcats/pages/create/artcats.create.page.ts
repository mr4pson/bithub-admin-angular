import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CArtcat } from 'src/app/model/entities/artcat';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CArtcatRepository } from 'src/app/services/repositories/artcat.repository';

@Component({
	selector: 'artcats-create-page',
	templateUrl: './artcats.create.page.html',	
	styleUrls: [
		"../../../../styles/forms.scss",
		"../../../../styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CArtcatsCreatePage extends CEntityPage<CArtcat> implements OnInit {		
	public homeUrl: string = "/education/artcats";
	public requiredFields: string[] = ["name"];	
	public ll: CLang[] = [];

	constructor(		
		protected artcatRepository: CArtcatRepository,		
		protected appService: CAppService,		
		protected router: Router,		
		protected langRepository: CLangRepository,     
	) 
	{
		super(artcatRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["artcats-head"]} - ${this.thelang.words["common-create"]}`); 
			this.ll = await this.langRepository.loadAll();
			this.x = new CArtcat().init(this.ll);					
			this.appService.monitorLog("[artcats create] page loaded");
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

