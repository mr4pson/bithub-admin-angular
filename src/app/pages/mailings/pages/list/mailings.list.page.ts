import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CMailing } from 'src/app/model/entities/mailing';
import { CAppService } from 'src/app/services/app.service';
import { CMailingsListService } from '../../services/mailings.list.service';
import { CMailingRepository } from 'src/app/services/repositories/mailing.repository';

@Component({
	selector: 'mailings-list-page',
	templateUrl: './mailings.list.page.html',
    styleUrls: ["../../../../styles/lists.scss"],
})
export class CMailingsListPage extends CListPage<CMailing> implements OnInit {
    public homeUrl: string = "/mailings";

    constructor(
        protected mailingRepository: CMailingRepository,
        protected appService: CAppService,
        protected listService: CMailingsListService,
    )
    {
        super(mailingRepository, appService, listService);
    }

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["mailings-head"]);
            await this.initList();
            this.appService.monitorLog("[mailings] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }

    public async run(x: CMailing): Promise<void> {
        try {
            if (!window.confirm(this.thelang.words['common-sure'])) return;
            x.status = "running";
            await this.mailingRepository.run(x.id);
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }
}

