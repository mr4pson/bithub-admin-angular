import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CPromocode } from 'src/app/model/entities/promocode';
import { CAppService } from 'src/app/services/app.service';
import { CPromocodeRepository } from 'src/app/services/repositories/promocode.repository';

@Component({
	selector: 'promocodes-create-page',
	templateUrl: './promocodes.create.page.html',	
	styleUrls: ["../../../../styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CPromocodesCreatePage extends CEntityPage<CPromocode> implements OnInit {		
	public homeUrl: string = "/finances/promocodes";
	public requiredFields: string[] = ["code"];	

	constructor(		
		protected promocodeRepository: CPromocodeRepository,		
		protected appService: CAppService,		
		protected router: Router,		
	) 
	{
		super(promocodeRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["promocodes-head"]} - ${this.thelang.words["common-create"]}`); 
			this.x = new CPromocode().init();	
			this.appService.monitorLog("[promocodes create] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}	
	}

	protected validate(): boolean {
		let error = false;
		this.errors.code = null;
		
		if (!this.x.code) {
			this.errors.code = "common-error-required";
			error = true;
		}				

		return !error;
	}
}

