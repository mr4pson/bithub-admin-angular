import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CProposal } from 'src/app/model/entities/proposal';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CProposalRepository } from 'src/app/services/repositories/proposal.repository';
import { CAuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'proposals-edit-page',
	templateUrl: './proposals.edit.page.html',	
	styleUrls: [
		"../../../../styles/forms.scss",
		"../../../../styles/lists.scss",
	],
	encapsulation: ViewEncapsulation.None,
})
export class CProposalsEditPage extends CEntityPage<CProposal> implements OnInit {		
	public homeUrl: string = "/catalogue/proposals";
	public requiredFields: string[] = [];	

	constructor(		
		protected proposalRepository: CProposalRepository,		
		protected appService: CAppService,		
		protected authService: CAuthService,
		protected router: Router,
		protected route: ActivatedRoute,			
		protected langRepository: CLangRepository,
	) 
	{
		super(proposalRepository, appService, router);
	}	

	get group_id(): number {return this.authService.authData.group_id;}

	public async ngOnInit(): Promise<void> {
		try {	
			this.appService.setTitle(`${this.thelang.words["proposals-head"]} - ${this.thelang.words["common-edit"]}`); 				
			this.x = await this.proposalRepository.loadOne(parseInt(this.route.snapshot.params["id"]));
			this.appService.monitorLog("[proposals edit] page loaded");
			this.ready = true;
		} catch (err) {
			this.appService.monitorLog(err, true);
		}
	}	

	protected validate(): boolean {
		return true;
	}
}
