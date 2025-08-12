import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CBaxer } from 'src/app/model/entities/baxer';
import { CBaxerRepository } from 'src/app/services/repositories/baxer.repository';
import { CAppService } from 'src/app/services/app.service';
import { CBaxersListService } from '../../services/baxers.list.service';

@Component({
	selector: 'baxers-list-page',
	templateUrl: './baxers.list.page.html',	
    styleUrls: ["../../../../styles/lists.scss"],
})
export class CBaxersListPage extends CListPage<CBaxer> implements OnInit {    
    public homeUrl: string = "/misc/baxers";    

    constructor(        
        protected baxerRepository: CBaxerRepository, 
        protected appService: CAppService,        
        protected listService: CBaxersListService,        
    ) {      
        super(baxerRepository, appService, listService);
    }    

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["baxers-head"]); 
            await this.initList();            
            this.appService.monitorLog("[baxers] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}
