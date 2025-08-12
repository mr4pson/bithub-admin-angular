import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CPromocode } from 'src/app/model/entities/promocode';
import { CAppService } from 'src/app/services/app.service';
import { CPromocodesListService } from '../../services/promocodes.list.service';
import { CPromocodeRepository } from 'src/app/services/repositories/promocode.repository';

@Component({
	selector: 'promocodes-list-page',
	templateUrl: './promocodes.list.page.html',	
    styleUrls: [
        "../../../../styles/lists.scss",
        "../../../../styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CPromocodesListPage extends CListPage<CPromocode> implements OnInit {    
    public homeUrl: string = "/finances/promocodes";  
    
    constructor(        
        protected promocodeRepository: CPromocodeRepository, 
        protected appService: CAppService,        
        protected listService: CPromocodesListService,  
    ) 
    {      
        super(promocodeRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["promocodes-head"]); 
            await this.initList();    
            this.appService.monitorLog("[promocodes] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

