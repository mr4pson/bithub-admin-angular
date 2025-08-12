import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CShoporder } from 'src/app/model/entities/shoporder';
import { CAppService } from 'src/app/services/app.service';
import { CShopordersListService } from '../../services/shoporders.list.service';
import { CShoporderRepository } from 'src/app/services/repositories/shoporder.repository';

@Component({
	selector: 'shoporders-list-page',
	templateUrl: './shoporders.list.page.html',
    styleUrls: [
        "../../../../styles/lists.scss",
        "../../../../styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CShopordersListPage extends CListPage<CShoporder> implements OnInit {
    public homeUrl: string = "/shop/shoporders";

    constructor(
        protected shoporderRepository: CShoporderRepository,
        protected appService: CAppService,
        protected listService: CShopordersListService,
    )
    {
        super(shoporderRepository, appService, listService);
    }

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["shoporders-head"]);
            await this.initList();
            this.appService.monitorLog("[shoporders] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}

