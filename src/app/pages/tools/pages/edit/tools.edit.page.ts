import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CLang } from 'src/app/model/entities/lang';
import { CTool } from 'src/app/model/entities/tool';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CToolRepository } from 'src/app/services/repositories/tool.repository';

@Component({
  selector: 'tools-edit-page',
  templateUrl: './tools.edit.page.html',
  styleUrls: ['../../../../styles/forms.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CToolsEditPage
  extends CEntityPage<CTool>
  implements OnInit, OnDestroy
{
  public homeUrl: string = '/tools/tools';
  public requiredFields: string[] = ['name', 'slug', 'img'];
  public ll: CLang[] = [];
  private intervalFn: NodeJS.Timeout;

  constructor(
    protected toolRepository: CToolRepository,
    protected appService: CAppService,
    protected router: Router,
    private route: ActivatedRoute,
    private langRepository: CLangRepository
  ) {
    super(toolRepository, appService, router);
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.appService.setTitle(
        `${this.thelang.words['tools-head']} - ${this.thelang.words['common-edit']}`
      );
      this.x = await this.toolRepository.loadOne(
        parseInt(this.route.snapshot.params['id'])
      );
      this.ll = await this.langRepository.loadAll();
      this.appService.monitorLog('[tools edit] page loaded');
      this.ready = true;

      this.intervalFn = setInterval(() => {
        if (this.validate()) {
          this.appService.monitorLog(`autosave`);
          this.save();
        }
      }, 30_000);
    } catch (err) {
      this.appService.monitorLog(err, true);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalFn);
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

  private async save() {
    this.reloading = true;
    this.appService.monitorLog(`updating object...`);
    await this.repository.update({
      ...this.x,
    } as CTool);
    this.appService.monitorLog(`object updated`);
    await this.appService.pause(500);
    this.reloading = false;
  }
}
