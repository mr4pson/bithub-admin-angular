import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CProposal } from 'src/app/model/entities/proposal';
import { CProposalRepository } from 'src/app/services/repositories/proposal.repository';
import { CAppService } from 'src/app/services/app.service';
import { CProposalsListService } from '../../services/proposals.list.service';

@Component({
	selector: 'proposals-list-page',
	templateUrl: './proposals.list.page.html',	
    styleUrls: [
        "../../../../styles/lists.scss",
        "../../../../styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CProposalsListPage extends CListPage<CProposal> implements OnInit {    
    public homeUrl: string = "/catalogue/proposals";  

    constructor(        
        protected proposalRepository: CProposalRepository, 
        protected appService: CAppService,        
        protected listService: CProposalsListService,  
    ) 
    {      
        super(proposalRepository, appService, listService);
    }  
    
    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["proposals-head"]); 
            await this.initList();    
            this.appService.monitorLog("[proposals] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

