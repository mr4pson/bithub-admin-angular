import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CLinktype } from 'src/app/model/entities/linktype';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CLinktypeRepository } from 'src/app/services/repositories/linktype.repository';

@Component({
	selector: 'linktypes-edit-page',
	templateUrl: './linktypes.edit.page.html',	
	styleUrls: ["../../../../styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CLinktypesEditPage extends CEntityPage<CLinktype> implements OnInit {		
	public homeUrl: string = "/catalogue/linktypes";
	public requiredFields: string[] = ["name", "img"];	

	constructor(		
		protected linktypeRepository: CLinktypeRepository,		
		protected appService: CAppService,		
		protected router: Router,
		private route: ActivatedRoute,			
	) 
	{
		super(linktypeRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["linktypes-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.linktypeRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[linktypes edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		let error = false;
		this.errors.name = null;
		this.errors.img = null;

		if (!this.x.name) {
			this.errors.name = "common-error-required";
			error = true;
		}

		if (!this.x.img) {
			this.errors.img = "common-error-required";
			error = true;
		}

		return !error;
	}
}
