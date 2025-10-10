import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CWithdraworder } from 'src/app/model/entities/withdraworder';
import { CListPage } from 'src/app/pages/list.page';
import { CAppService } from 'src/app/services/app.service';
import { CWithdraworderRepository } from 'src/app/services/repositories/withdraworder.repository';
import { CWithdrawordersListService } from '../../services/withdraworders.list.service';
import { CAuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'withdrawals-list-page',
  templateUrl: './withdrawals.list.page.html',
  styleUrls: ['../../../../styles/lists.scss', '../../../../styles/forms.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CWithdrawalsListPage
  extends CListPage<CWithdraworder>
  implements OnInit
{
  public homeUrl: string = '/finances/withdrawals';

  get isAdminSeller() {
    return this.authService.admin.group_id === 3;
  }

  constructor(
    protected withdraworderRepository: CWithdraworderRepository,
    protected appService: CAppService,
    protected authService: CAuthService,
    protected listService: CWithdrawordersListService
  ) {
    super(withdraworderRepository, appService, listService);
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.appService.setTitle(this.thelang.words['withdraworders-head']);
      await this.initList();
      this.appService.monitorLog('[withdraworders] page loaded');
      this.ready = true;
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }
}
