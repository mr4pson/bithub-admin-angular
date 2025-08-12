import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CShopcatRepository } from 'src/app/services/repositories/shopcat.repository';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CShopcatsListService } from '../../services/shopcats.list.service';
import { CShopcat } from 'src/app/model/entities/shopcat';

@Component({
	selector: 'shopcats-list-page',
	templateUrl: './shopcats.list.page.html',
    styleUrls: ["../../../../styles/lists.scss"],
})
export class CShopcatsListPage extends CListPage<CShopcat> implements OnInit {
    public homeUrl: string = "/shop/shopcats";
    public ll: CLang[] = [];
    public selectedLang: CLang = null;

    constructor(
        protected shopcatRepository: CShopcatRepository,
        protected appService: CAppService,
        protected listService: CShopcatsListService,
        protected langRepository: CLangRepository,
    )
    {
        super(shopcatRepository, appService, listService);
    }

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["shopcats-head"]);
            await this.initList();
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];
            this.appService.monitorLog("[shopcats] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}

