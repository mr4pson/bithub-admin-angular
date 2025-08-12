import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { COutorder } from 'src/app/model/entities/outorder';
import { CAppService } from 'src/app/services/app.service';
import { COutorderRepository } from 'src/app/services/repositories/outorder.repository';

@Component({
	selector: 'outorders-edit-page',
	templateUrl: './outorders.edit.page.html',	
	styleUrls: [
		"../../../../styles/forms.scss",
		"../../../../styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class COutordersEditPage extends CEntityPage<COutorder> implements OnInit {		
	public homeUrl: string = "/finances/outorders";
	public requiredFields: string[] = [];	

	constructor(		
		protected outorderRepository: COutorderRepository,		
		protected appService: CAppService,		
		protected router: Router,
		private route: ActivatedRoute,			
	) 
	{
		super(outorderRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["outorders-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.outorderRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[outorders edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		return true; // dummy
	}
}
