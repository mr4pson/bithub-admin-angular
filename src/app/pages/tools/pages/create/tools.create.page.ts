import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CLang } from 'src/app/model/entities/lang';
import { CTool } from 'src/app/model/entities/tool';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CToolRepository } from 'src/app/services/repositories/tool.repository';

@Component({
  selector: 'tools-create-page',
  templateUrl: './tools.create.page.html',
  styleUrls: ['../../../../styles/forms.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CToolsCreatePage extends CEntityPage<CTool> implements OnInit {
  public homeUrl: string = '/tools/tools';
  public requiredFields: string[] = ['name', 'slug', 'img'];
  public ll: CLang[] = [];

  constructor(
    protected toolRepository: CToolRepository,
    protected appService: CAppService,
    protected router: Router,
    private langRepository: CLangRepository
  ) {
    super(toolRepository, appService, router);
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.appService.setTitle(
        `${this.thelang.words['tools-head']} - ${this.thelang.words['common-create']}`
      );
      this.ll = await this.langRepository.loadAll();
      this.x = new CTool().init(this.ll);
      this.appService.monitorLog('[tools create] page loaded');
      this.ready = true;
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }

  protected validate(): boolean {
    let error = false;
    this.errors.name = null;
    this.errors.slug = null;
    this.errors.img = null;

    for (let t of this.x.translations) {
      if (!t.name) {
        this.errors.name = 'common-error-required-ml';
        error = true;
        break;
      }
    }

    if (!this.x.slug) {
      this.errors.slug = 'common-error-required';
      error = true;
    }

    if (!this.x.img) {
      this.errors.img = 'common-error-required';
      error = true;
    }

    return !error;
  }
}
