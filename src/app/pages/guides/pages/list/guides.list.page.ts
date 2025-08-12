import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CGuide } from 'src/app/model/entities/guide';
import { CGuideRepository } from 'src/app/services/repositories/guide.repository';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CGuidesListService } from '../../services/guides.list.service';
import { CAuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'guides-list-page',
	templateUrl: './guides.list.page.html',	
    styleUrls: [
        "../../../../styles/lists.scss",
        "../../../../styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CGuidesListPage extends CListPage<CGuide> implements OnInit {    
    public homeUrl: string = "/catalogue/guides";  
    public ll: CLang[] = []; 
    public selectedLang: CLang = null; 

    constructor(        
        protected guideRepository: CGuideRepository, 
        protected appService: CAppService,        
        protected authService: CAuthService,
        protected listService: CGuidesListService,  
        protected langRepository: CLangRepository,      
    ) 
    {      
        super(guideRepository, appService, listService);
    }  
    
    get group_id(): number {return this.authService.authData.group_id;}

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["guides-head"]); 
            await this.initList();    
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];        
            this.appService.monitorLog("[guides] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

