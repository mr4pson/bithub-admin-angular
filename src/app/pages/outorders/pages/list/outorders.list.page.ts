import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { COutorder } from 'src/app/model/entities/outorder';
import { CAppService } from 'src/app/services/app.service';
import { COutordersListService } from '../../services/outorders.list.service';
import { COutorderRepository } from 'src/app/services/repositories/outorder.repository';

@Component({
	selector: 'outorders-list-page',
	templateUrl: './outorders.list.page.html',	
    styleUrls: [
        "../../../../styles/lists.scss",
        "../../../../styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class COutordersListPage extends CListPage<COutorder> implements OnInit {    
    public homeUrl: string = "/finances/outorders";  
    
    constructor(        
        protected outorderRepository: COutorderRepository, 
        protected appService: CAppService,        
        protected listService: COutordersListService,  
    ) 
    {      
        super(outorderRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["outorders-head"]); 
            await this.initList();  
            this.appService.monitorLog("[outorders] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

