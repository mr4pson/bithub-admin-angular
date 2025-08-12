import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CInorder } from 'src/app/model/entities/inorder';
import { CAppService } from 'src/app/services/app.service';
import { CInordersListService } from '../../services/inorders.list.service';
import { CInorderRepository } from 'src/app/services/repositories/inorder.repository';

@Component({
	selector: 'inorders-list-page',
	templateUrl: './inorders.list.page.html',	
    styleUrls: [
        "../../../../styles/lists.scss",
        "../../../../styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CInordersListPage extends CListPage<CInorder> implements OnInit {    
    public homeUrl: string = "/finances/inorders";  
    
    constructor(        
        protected inorderRepository: CInorderRepository, 
        protected appService: CAppService,        
        protected listService: CInordersListService,  
    ) 
    {      
        super(inorderRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["inorders-head"]); 
            await this.initList();  
            this.appService.monitorLog("[inorders] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

