import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { clear } from 'console';
import { GUIDE_TYPES } from 'src/app/components/selects/select-simple/constants';
import { CGuide } from 'src/app/model/entities/guide';
import { CLang } from 'src/app/model/entities/lang';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CAppService } from 'src/app/services/app.service';
import { CAuthService } from 'src/app/services/auth.service';
import { CGuideRepository } from 'src/app/services/repositories/guide.repository';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';

@Component({
  selector: 'guides-edit-page',
  templateUrl: './guides.edit.page.html',
  styleUrls: ['../../../../styles/forms.scss', '../../../../styles/lists.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CGuidesEditPage
  extends CEntityPage<CGuide>
  implements OnInit, OnDestroy
{
  public homeUrl: string = '/catalogue/guides';
  public requiredFields: string[] = ['name', 'content', 'contentshort'];
  public ll: CLang[] = [];
  private intervalFn: NodeJS.Timeout;

  constructor(
    protected guideRepository: CGuideRepository,
    protected appService: CAppService,
    protected authService: CAuthService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected langRepository: CLangRepository
  ) {
    super(guideRepository, appService, router);
  }

  get group_id(): number {
    return this.authService.authData.group_id;
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.appService.setTitle(
        `${this.thelang.words['guides-head']} - ${this.thelang.words['common-edit']}`
      );
      this.x = await this.guideRepository.loadOne(
        parseInt(this.route.snapshot.params['id'])
      );
      this.ll = await this.langRepository.loadAll();
      this.appService.monitorLog('[guides edit] page loaded');
      this.ready = true;

      this.intervalFn = setInterval(() => {
        if (this.validate()) {
          this.appService.monitorLog('autosave');
          this.save(true);
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

  public async update(): Promise<void> {
    try {
      if (!this.validate()) return;

      await this.save();

      this.router.navigateByUrl(this.homeUrl);
    } catch (err) {
      console.log(err);
      this.appService.monitorLog(`error: ${err}`, true);
      await this.appService.pause(500);
      this.reloading = false;
    }
  }

  private async save(autosave = false) {
    const currentType = GUIDE_TYPES.find(
      (type) =>
        (this.x.type as unknown as number) === type.id ||
        type.translations[0].type === this.x.type
    );

    this.reloading = true;
    this.appService.monitorLog(`updating object...`);
    await this.repository.update({
      ...this.x,
      type: currentType?.translations[0].type,
      autosave,
    } as CGuide);
    this.appService.monitorLog(`object updated`);
    await this.appService.pause(500);
    this.reloading = false;
  }
}
