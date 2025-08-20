import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CGuide } from 'src/app/model/entities/guide';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CGuideRepository } from 'src/app/services/repositories/guide.repository';
import { GUIDE_TYPES } from 'src/app/components/selects/select-simple/constants';

@Component({
  selector: 'guides-create-page',
  templateUrl: './guides.create.page.html',
  styleUrls: ['../../../../styles/forms.scss', '../../../../styles/lists.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CGuidesCreatePage extends CEntityPage<CGuide> implements OnInit {
  public homeUrl: string = '/catalogue/guides';
  public requiredFields: string[] = ['name', 'content', 'contentshort'];
  public ll: CLang[] = [];

  constructor(
    protected guideRepository: CGuideRepository,
    protected appService: CAppService,
    protected router: Router,
    protected langRepository: CLangRepository
  ) {
    super(guideRepository, appService, router);
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.appService.setTitle(
        `${this.thelang.words['guides-head']} - ${this.thelang.words['common-create']}`
      );
      this.ll = await this.langRepository.loadAll();
      this.x = new CGuide().init(this.ll);
      this.appService.monitorLog('[guides create] page loaded');
      this.ready = true;
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }

  protected validate(): boolean {
    let error = false;
    this.errors.name = null;
    this.errors.content = null;
    this.errors.contentshort = null;

    for (let t of this.x.translations) {
      if (!t.name) {
        this.errors.name = 'common-error-required-ml';
        error = true;
        break;
      }
    }

    for (let t of this.x.translations) {
      if (!t.content) {
        this.errors.content = 'common-error-required-ml';
        error = true;
        break;
      }
    }

    for (let t of this.x.translations) {
      if (!t.contentshort) {
        this.errors.contentshort = 'common-error-required-ml';
        error = true;
        break;
      }
    }

    return !error;
  }

  public async create(): Promise<void> {
    try {
      if (!this.validate()) return;

      const currentType = GUIDE_TYPES.find(
        (type) => (this.x.type as unknown as number) === type.id
      );

      this.reloading = true;
      this.appService.monitorLog(`creating object...`);
      await this.repository.create({
        ...this.x,
        type: currentType.translations[0].type,
      } as CGuide);
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
