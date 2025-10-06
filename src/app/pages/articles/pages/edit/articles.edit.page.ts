import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CArticle } from 'src/app/model/entities/article';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CArticleRepository } from 'src/app/services/repositories/article.repository';

@Component({
  selector: 'articles-edit-page',
  templateUrl: './articles.edit.page.html',
  styleUrls: ['../../../../styles/forms.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CArticlesEditPage
  extends CEntityPage<CArticle>
  implements OnInit, OnDestroy
{
  public homeUrl: string = '/education/articles';
  public requiredFields: string[] = ['name', 'slug', 'img'];
  public ll: CLang[] = [];
  private intervalFn: NodeJS.Timeout;

  constructor(
    protected articleRepository: CArticleRepository,
    protected appService: CAppService,
    protected router: Router,
    private route: ActivatedRoute,
    private langRepository: CLangRepository
  ) {
    super(articleRepository, appService, router);
  }

  public async ngOnInit(): Promise<void> {
    try {
      this.appService.setTitle(
        `${this.thelang.words['articles-head']} - ${this.thelang.words['common-edit']}`
      );
      this.x = await this.articleRepository.loadOne(
        parseInt(this.route.snapshot.params['id'])
      );
      this.ll = await this.langRepository.loadAll();
      this.appService.monitorLog('[articles edit] page loaded');
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
    } as CArticle);
    this.appService.monitorLog(`object updated`);
    await this.appService.pause(500);
    this.reloading = false;
  }
}
