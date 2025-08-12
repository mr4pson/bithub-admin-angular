import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CLinktype } from 'src/app/model/entities/linktype';
import { CAppService } from 'src/app/services/app.service';
import { CLinktypesListService } from '../../services/linktypes.list.service';
import { CLinktypeRepository } from 'src/app/services/repositories/linktype.repository';

@Component({
	selector: 'linktypes-list-page',
	templateUrl: './linktypes.list.page.html',	
    styleUrls: ["../../../../styles/lists.scss"],
})
export class CLinktypesListPage extends CListPage<CLinktype> implements OnInit {    
    public homeUrl: string = "/catalogue/linktypes";  
    
    constructor(        
        protected linktypeRepository: CLinktypeRepository, 
        protected appService: CAppService,        
        protected listService: CLinktypesListService,  
    ) 
    {      
        super(linktypeRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["linktypes-head"]); 
            await this.initList();    
            this.appService.monitorLog("[linktypes] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

