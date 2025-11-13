import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CToolcat } from 'src/app/model/entities/toolcat';
import { CToolcatRepository } from 'src/app/services/repositories/toolcat.repository';

@Component({
  selector: 'toolcats-create-page',
  templateUrl: './toolcats.create.page.html',
  styleUrls: ['../../../../styles/forms.scss', '../../../../styles/lists.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CToolcatsCreatePage
  extends CEntityPage<CToolcat>
  implements OnInit
{
  public homeUrl: string = '/tools/toolcats';
  public requiredFields: string[] = ['name'];
  public ll: CLang[] = [];

  constructor(
    protected toolcatRepository: CToolcatRepository,
    protected appService: CAppService,
    protected router: Router,
    protected langRepository: CLangRepository
  ) {
    super(toolcatRepository, appService, router);
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.appService.setTitle(
        `${this.thelang.words['toolcats-head']} - ${this.thelang.words['common-create']}`
      );
      this.ll = await this.langRepository.loadAll();
      this.x = new CToolcat().init(this.ll);
      this.appService.monitorLog('[toolcats create] page loaded');
      this.ready = true;
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }

  protected validate(): boolean {
    let error = false;
    this.errors.name = null;

    for (let t of this.x.translations) {
      if (!t.name) {
        this.errors.name = 'common-error-required-ml';
        error = true;
        break;
      }
    }

    return !error;
  }
}
