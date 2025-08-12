import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CReforder } from 'src/app/model/entities/reforder';
import { CAppService } from 'src/app/services/app.service';
import { CRefordersListService } from '../../services/reforders.list.service';
import { CReforderRepository } from 'src/app/services/repositories/reforder.repository';

@Component({
	selector: 'reforders-list-page',
	templateUrl: './reforders.list.page.html',	
    styleUrls: [
        "../../../../styles/lists.scss",
        "../../../../styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CRefordersListPage extends CListPage<CReforder> implements OnInit {    
    public homeUrl: string = "/finances/reforders";  
    
    constructor(        
        protected reforderRepository: CReforderRepository, 
        protected appService: CAppService,        
        protected listService: CRefordersListService,  
    ) 
    {      
        super(reforderRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["reforders-head"]); 
            await this.initList();  
            this.appService.monitorLog("[reforders] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

