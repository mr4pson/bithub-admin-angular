import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CShopitem } from 'src/app/model/entities/shopitem';
import { CAppService } from 'src/app/services/app.service';
import { CShopitemsListService } from '../../services/shopitems.list.service';
import { CShopitemRepository } from 'src/app/services/repositories/shopitem.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';

@Component({
	selector: 'shopitems-list-page',
	templateUrl: './shopitems.list.page.html',
    styleUrls: [
        "../../../../styles/lists.scss",
        "../../../../styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CShopitemsListPage extends CListPage<CShopitem> implements OnInit {
    public homeUrl: string = "/shop/shopitems";
    public ll: CLang[] = [];
    public selectedLang: CLang = null;

    constructor(
        protected shopitemRepository: CShopitemRepository,
        protected langRepository: CLangRepository,
        protected appService: CAppService,
        protected listService: CShopitemsListService,
    )
    {
        super(shopitemRepository, appService, listService);
    }

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["shopitems-head"]);
            await this.initList();
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];
            this.appService.monitorLog("[shopitems] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }

    public async archive(id: number): Promise<void> {
        try {
            if (confirm(this.thelang.words['common-sure'])) {
                this.reloading = true;
                this.appService.monitorLog(`archiving object: id=${id}`);
                await this.shopitemRepository.archive(id);
                this.appService.monitorLog("ok");
                this.initList();
            }
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            this.reloading = false;
        }
    }

    public async archiveBulk(): Promise<void> {
        try {
            if (this.canBulk && confirm(this.thelang.words['common-sure'])) {
                this.reloading = true;
                let ids = this.xl.filter(x => x.__selected).map(x => x.id);
                this.appService.monitorLog(`archiving multiple objects: id=${ids.toString()}`);
                await this.shopitemRepository.archiveBulk(ids);
                this.appService.monitorLog("ok");
                this.initList();
            }
        } catch (err) {
            this.appService.monitorLog(`error: ${err}`, true);
            this.reloading = false;
        }
    }
}

