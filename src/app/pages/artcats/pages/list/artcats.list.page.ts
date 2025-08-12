import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CArtcatRepository } from 'src/app/services/repositories/artcat.repository';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CArtcatsListService } from '../../services/artcats.list.service';
import { CArtcat } from 'src/app/model/entities/artcat';

@Component({
	selector: 'artcats-list-page',
	templateUrl: './artcats.list.page.html',	
    styleUrls: ["../../../../styles/lists.scss"],
})
export class CArtcatsListPage extends CListPage<CArtcat> implements OnInit {    
    public homeUrl: string = "/education/artcats";  
    public ll: CLang[] = []; 
    public selectedLang: CLang = null; 

    constructor(        
        protected artcatRepository: CArtcatRepository, 
        protected appService: CAppService,        
        protected listService: CArtcatsListService,  
        protected langRepository: CLangRepository,      
    ) 
    {      
        super(artcatRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["artcats-head"]); 
            await this.initList();    
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];        
            this.appService.monitorLog("[artcats] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

