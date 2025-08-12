import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CDrop } from 'src/app/model/entities/drop';
import { CAppService } from 'src/app/services/app.service';
import { CDropsListService } from '../../services/drops.list.service';
import { CDropRepository } from 'src/app/services/repositories/drop.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';

@Component({
	selector: 'drops-list-page',
	templateUrl: './drops.list.page.html',
    styleUrls: [
        "../../../../styles/lists.scss",
        "../../../../styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CDropsListPage extends CListPage<CDrop> implements OnInit {
    public homeUrl: string = "/misc/drops";
    public ll: CLang[] = [];
    public selectedLang: CLang = null;

    constructor(
        protected dropRepository: CDropRepository,
        protected langRepository: CLangRepository,
        protected appService: CAppService,
        protected listService: CDropsListService,
    )
    {
        super(dropRepository, appService, listService);
    }

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["drops-head"]);
            await this.initList();
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];
            this.appService.monitorLog("[drops] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}

