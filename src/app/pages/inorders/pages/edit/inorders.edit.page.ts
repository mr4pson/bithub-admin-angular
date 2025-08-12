import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CInorder } from 'src/app/model/entities/inorder';
import { CAppService } from 'src/app/services/app.service';
import { CInorderRepository } from 'src/app/services/repositories/inorder.repository';

@Component({
	selector: 'inorders-edit-page',
	templateUrl: './inorders.edit.page.html',	
	styleUrls: [
		"../../../../styles/forms.scss",
		"../../../../styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CInordersEditPage extends CEntityPage<CInorder> implements OnInit {		
	public homeUrl: string = "/finances/inorders";
	public requiredFields: string[] = [];	

	constructor(		
		protected inorderRepository: CInorderRepository,		
		protected appService: CAppService,		
		protected router: Router,
		private route: ActivatedRoute,			
	) 
	{
		super(inorderRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["inorders-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.inorderRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[inorders edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		return true; // dummy
	}
}
