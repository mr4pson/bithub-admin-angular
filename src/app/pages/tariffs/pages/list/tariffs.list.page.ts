import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CTariff } from 'src/app/model/entities/tariff';
import { CTariffRepository } from 'src/app/services/repositories/tariff.repository';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CTariffsListService } from '../../services/tariffs.list.service';
import { CAuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'tariffs-list-page',
  templateUrl: './tariffs.list.page.html',
  styleUrls: ['../../../../styles/lists.scss', '../../../../styles/forms.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CTariffsListPage extends CListPage<CTariff> implements OnInit {
  public homeUrl: string = '/finances/tariffs';
  public ll: CLang[] = [];
  public selectedLang: CLang = null;

  get isAdminSeller() {
    return this.authService.admin.group_id === 3;
  }

  constructor(
    protected tariffRepository: CTariffRepository,
    protected appService: CAppService,
    protected authService: CAuthService,
    protected listService: CTariffsListService,
    protected langRepository: CLangRepository
  ) {
    super(tariffRepository, appService, listService);
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.appService.setTitle(this.thelang.words['tariffs-head']);
      await this.initList();
      this.ll = await this.langRepository.loadAll();
      this.selectedLang = this.ll[0];
      this.appService.monitorLog('[tariffs] page loaded');
      this.ready = true;
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }
}
