import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CAppService } from 'src/app/services/app.service';
import { CUserRepository } from 'src/app/services/repositories/user.repository';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CUser } from 'src/app/model/entities/user';

@Component({
	selector: 'users-edit-page',
	templateUrl: './users.edit.page.html',	
	styleUrls: [
		"../../../../styles/forms.scss",
		"../../../../styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CUsersEditPage extends CEntityPage<CUser> implements OnInit {		
	public homeUrl: string = "/users";
	public requiredFields: string[] = ["email", "name"];	

	constructor(		
		protected userRepository: CUserRepository,		
		protected appService: CAppService,		
		protected router: Router,
		protected route: ActivatedRoute,			
	) 
	{
		super(userRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["users-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.userRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[users edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		let error = false;
		this.errors.email = null;
		this.errors.name = null;

		if (!this.appService.validateEmail(this.x.email)) {
			this.errors.email = "common-error-email";
			error = true;
		}		

		if (!this.x.name) {
			this.errors.name = "common-error-required";
			error = true;
		}

		return !error;
	}
}
