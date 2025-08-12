import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CArtcat } from 'src/app/model/entities/artcat';
import { CLang } from 'src/app/model/entities/lang';
import { CArtcatRepository } from 'src/app/services/repositories/artcat.repository';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';

@Component({
	selector: 'artcats-edit-page',
	templateUrl: './artcats.edit.page.html',	
	styleUrls: [
		"../../../../styles/forms.scss",
		"../../../../styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CArtcatsEditPage extends CEntityPage<CArtcat> implements OnInit {		
	public homeUrl: string = "/education/artcats";
	public requiredFields: string[] = ["name"];	
	public ll: CLang[] = [];

	constructor(		
		protected artcatRepository: CArtcatRepository,		
		protected appService: CAppService,		
		protected router: Router,
		protected route: ActivatedRoute,			
		protected langRepository: CLangRepository,
	) 
	{
		super(artcatRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["artcats-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.artcatRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.ll = await this.langRepository.loadAll();
			this.appService.monitorLog("[artcats edit] page loaded");
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

