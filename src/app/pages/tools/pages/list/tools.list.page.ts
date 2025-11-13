import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CAppService } from 'src/app/services/app.service';
import { CLang } from 'src/app/model/entities/lang';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CToolsListService } from '../../services/tools.list.service';
import { CTool } from 'src/app/model/entities/tool';
import { CToolRepository } from 'src/app/services/repositories/tool.repository';

@Component({
  selector: 'tools-list-page',
  templateUrl: './tools.list.page.html',
  styleUrls: ['../../../../styles/lists.scss', '../../../../styles/forms.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CToolsListPage extends CListPage<CTool> implements OnInit {
  public homeUrl: string = '/tools/tools';
  public ll: CLang[] = [];
  public selectedLang: CLang = null;

  constructor(
    protected toolRepository: CToolRepository,
    protected langRepository: CLangRepository,
    protected appService: CAppService,
    protected listService: CToolsListService
  ) {
    super(toolRepository, appService, listService);
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.appService.setTitle(this.thelang.words['tools-head']);
      await this.initList();
      this.ll = await this.langRepository.loadAll();
      this.selectedLang = this.ll[0];
      this.appService.monitorLog('[tools] page loaded');
      this.ready = true;
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }
}
