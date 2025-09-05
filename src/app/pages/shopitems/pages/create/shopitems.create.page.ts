import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CShopitem } from 'src/app/model/entities/shopitem';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CShopitemRepository } from 'src/app/services/repositories/shopitem.repository';
import { AVAILABLE_FOR_LIST } from 'src/app/components/selects/select-simple/constants';

@Component({
  selector: 'shopitems-create-page',
  templateUrl: './shopitems.create.page.html',
  styleUrls: ['../../../../styles/forms.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CShopitemsCreatePage
  extends CEntityPage<CShopitem>
  implements OnInit
{
  public homeUrl: string = '/shop/shopitems';
  public requiredFields: string[] = ['name', 'img'];
  public ll: CLang[] = [];

  constructor(
    protected shopitemRepository: CShopitemRepository,
    protected appService: CAppService,
    protected router: Router,
    private langRepository: CLangRepository
  ) {
    super(shopitemRepository, appService, router);
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.appService.setTitle(
        `${this.thelang.words['shopitems-head']} - ${this.thelang.words['common-create']}`
      );
      this.ll = await this.langRepository.loadAll();
      this.x = new CShopitem().init(this.ll);
      this.appService.monitorLog('[shopitems create] page loaded');
      this.ready = true;
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }

  protected validate(): boolean {
    let error = false;
    this.errors.name = null;
    this.errors.img = null;

    for (let t of this.x.translations) {
      if (!t.name) {
        this.errors.name = 'common-error-required-ml';
        error = true;
        break;
      }
    }

    if (!this.x.img) {
      this.errors.img = 'common-error-required';
      error = true;
    }

    return !error;
  }

  public async create(): Promise<void> {
    try {
      if (!this.validate()) return;

      const currentAvailableFor = AVAILABLE_FOR_LIST.find(
        (availableForItem) =>
          (this.x.available_for as unknown as number) === availableForItem.id ||
          availableForItem?.translations[0].type === this.x.available_for
      );

      this.reloading = true;
      this.appService.monitorLog(`creating object...`);
      await this.repository.create({
        ...this.x,
        available_for: currentAvailableFor.translations[0].type,
      } as CShopitem);
      this.appService.monitorLog(`object created`);
      await this.appService.pause(500);
      this.reloading = false;
      this.router.navigateByUrl(this.homeUrl);
    } catch (err) {
      this.appService.monitorLog(`error: ${err}`, true);
      await this.appService.pause(500);
      this.reloading = false;
    }
  }
}
