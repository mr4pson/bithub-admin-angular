import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CAward } from 'src/app/model/entities/award';
import { CAppService } from 'src/app/services/app.service';
import { CAwardsListService } from '../../services/awards.list.service';
import { CAwardRepository } from 'src/app/services/repositories/award.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';

@Component({
	selector: 'awards-list-page',
	templateUrl: './awards.list.page.html',	
    styleUrls: [
        "../../../../styles/lists.scss",
        "../../../../styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CAwardsListPage extends CListPage<CAward> implements OnInit {    
    public homeUrl: string = "/misc/awards";  
    public ll: CLang[] = []; 
    public selectedLang: CLang = null; 
    
    constructor(        
        protected awardRepository: CAwardRepository, 
        protected langRepository: CLangRepository,      
        protected appService: CAppService,        
        protected listService: CAwardsListService,  
    ) 
    {      
        super(awardRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["awards-head"]); 
            await this.initList();    
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];    
            this.appService.monitorLog("[awards] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

