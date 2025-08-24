import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CShoporder } from 'src/app/model/entities/shoporder';
import { CLang } from 'src/app/model/entities/lang';
import { CShoporderRepository } from 'src/app/services/repositories/shoporder.repository';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';

@Component({
  selector: 'shoporders-edit-page',
  templateUrl: './shoporders.edit.page.html',
  styleUrls: ['../../../../styles/forms.scss', '../../../../styles/lists.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CShopordersEditPage
  extends CEntityPage<CShoporder>
  implements OnInit
{
  public homeUrl: string = '/shop/shoporders';
  public requiredFields: string[] = ['shopitem_id'];

  constructor(
    protected shoporderRepository: CShoporderRepository,
    protected appService: CAppService,
    protected router: Router,
    protected route: ActivatedRoute
  ) {
    super(shoporderRepository, appService, router);
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.appService.setTitle(
        `${this.thelang.words['shoporders-head']} - ${this.thelang.words['common-edit']}`
      );
      this.x = await this.shoporderRepository.loadOne(
        parseInt(this.route.snapshot.params['id'])
      );
      this.appService.monitorLog('[shoporders edit] page loaded');
      this.ready = true;
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }

  protected validate(): boolean {
    let error = false;
    this.errors.shopitem_id = null;

    // if (!this.x.shopitem_id) {
    // 	this.errors.shopitem_id = "common-error-required";
    // 	error = true;
    // }

    return !error;
  }
}
