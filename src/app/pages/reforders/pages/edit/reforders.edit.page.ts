import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CReforder } from 'src/app/model/entities/reforder';
import { CAppService } from 'src/app/services/app.service';
import { CReforderRepository } from 'src/app/services/repositories/reforder.repository';

@Component({
	selector: 'reforders-edit-page',
	templateUrl: './reforders.edit.page.html',	
	styleUrls: [
		"../../../../styles/forms.scss",
		"../../../../styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CRefordersEditPage extends CEntityPage<CReforder> implements OnInit {		
	public homeUrl: string = "/finances/reforders";
	public requiredFields: string[] = [];	

	constructor(		
		protected reforderRepository: CReforderRepository,		
		protected appService: CAppService,		
		protected router: Router,
		private route: ActivatedRoute,			
	) 
	{
		super(reforderRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["reforders-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.reforderRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[reforders edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		return true; // dummy
	}
}
