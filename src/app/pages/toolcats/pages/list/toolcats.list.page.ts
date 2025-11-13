import { Component, OnInit } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CToolcat } from 'src/app/model/entities/toolcat';
import { CToolcatRepository } from 'src/app/services/repositories/toolcat.repository';
import { CToolcatsListService } from '../../services/toolcats.list.service';

@Component({
  selector: 'toolcats-list-page',
  templateUrl: './toolcats.list.page.html',
  styleUrls: ['../../../../styles/lists.scss'],
})
export class CToolcatsListPage extends CListPage<CToolcat> implements OnInit {
  public homeUrl: string = '/tools/toolcats';
  public ll: CLang[] = [];
  public selectedLang: CLang = null;

  constructor(
    protected toolcatRepository: CToolcatRepository,
    protected appService: CAppService,
    protected listService: CToolcatsListService,
    protected langRepository: CLangRepository
  ) {
    super(toolcatRepository, appService, listService);
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.appService.setTitle(this.thelang.words['toolcats-head']);
      await this.initList();
      this.ll = await this.langRepository.loadAll();
      this.selectedLang = this.ll[0];
      this.appService.monitorLog('[toolcats] page loaded');
      this.ready = true;
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }
}
