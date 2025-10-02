import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CWithdraworder } from 'src/app/model/entities/withdraworder';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CAppService } from 'src/app/services/app.service';
import { CWithdraworderRepository } from 'src/app/services/repositories/withdraworder.repository';

@Component({
  selector: 'withdrawals-edit-page',
  templateUrl: './withdrawals.edit.page.html',
  styleUrls: ['../../../../styles/forms.scss', '../../../../styles/lists.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CWithdrawalsEditPage
  extends CEntityPage<CWithdraworder>
  implements OnInit
{
  public homeUrl: string = '/finances/withdrawals';
  public requiredFields: string[] = [];

  constructor(
    protected withdraworderRepository: CWithdraworderRepository,
    protected appService: CAppService,
    protected router: Router,
    private route: ActivatedRoute
  ) {
    super(withdraworderRepository, appService, router);
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.appService.setTitle(
        `${this.thelang.words['withdrawals-head']} - ${this.thelang.words['common-edit']}`
      );
      this.x = await this.withdraworderRepository.loadOne(
        parseInt(this.route.snapshot.params['id'])
      );
      this.appService.monitorLog('[withdrawals edit] page loaded');
      this.ready = true;
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }

  protected validate(): boolean {
    return true; // dummy
  }
}
