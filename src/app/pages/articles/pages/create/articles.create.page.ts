import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CEntityPage } from 'src/app/pages/entity.page';
import { CArticle } from 'src/app/model/entities/article';
import { CLang } from 'src/app/model/entities/lang';
import { CAppService } from 'src/app/services/app.service';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';
import { CArticleRepository } from 'src/app/services/repositories/article.repository';

@Component({
	selector: 'articles-create-page',
	templateUrl: './articles.create.page.html',	
	styleUrls: ["../../../../styles/forms.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class CArticlesCreatePage extends CEntityPage<CArticle> implements OnInit {		
	public homeUrl: string = "/education/articles";
	public requiredFields: string[] = ["name", "slug", "img"];	
	public ll: CLang[] = [];

	constructor(		
		protected articleRepository: CArticleRepository,		
		protected appService: CAppService,		
		protected router: Router,		
		private langRepository: CLangRepository,     
	) 
	{
		super(articleRepository, appService, router);
	}	

	public async ngOnInit(): Promise<void> {
		try {			
			this.appService.setTitle(`${this.thelang.words["articles-head"]} - ${this.thelang.words["common-create"]}`); 
			this.ll = await this.langRepository.loadAll();
			this.x = new CArticle().init(this.ll);	
			this.appService.monitorLog("[articles create] page loaded");
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
				this.errors.name = "common-error-required-ml";
				error = true;
				break;
			}
		}

		if (!this.x.slug) {
			this.errors.slug = "common-error-required";
			error = true;
		}

		if (!this.x.img) {
			this.errors.img = "common-error-required";
			error = true;
		}

		return !error;
	}
}

