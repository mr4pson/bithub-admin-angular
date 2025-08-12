import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CListPage } from 'src/app/pages/list.page';
import { CArticle } from 'src/app/model/entities/article';
import { CAppService } from 'src/app/services/app.service';
import { CArticlesListService } from '../../services/articles.list.service';
import { CArticleRepository } from 'src/app/services/repositories/article.repository';
import { CLang } from 'src/app/model/entities/lang';
import { CLangRepository } from 'src/app/services/repositories/lang.repository';

@Component({
	selector: 'articles-list-page',
	templateUrl: './articles.list.page.html',	
    styleUrls: [
        "../../../../styles/lists.scss",
        "../../../../styles/forms.scss",
    ],
    encapsulation: ViewEncapsulation.None,
})
export class CArticlesListPage extends CListPage<CArticle> implements OnInit {    
    public homeUrl: string = "/education/articles";  
    public ll: CLang[] = []; 
    public selectedLang: CLang = null; 
    
    constructor(        
        protected articleRepository: CArticleRepository, 
        protected langRepository: CLangRepository,      
        protected appService: CAppService,        
        protected listService: CArticlesListService,  
    ) 
    {      
        super(articleRepository, appService, listService);
    }   

    public async ngOnInit(): Promise<void> {
        try {
            this.appService.setTitle(this.thelang.words["articles-head"]); 
            await this.initList();    
            this.ll = await this.langRepository.loadAll();
            this.selectedLang = this.ll[0];    
            this.appService.monitorLog("[articles] page loaded");
            this.ready = true;
        } catch (err) {
            this.appService.monitorLog(err, true);
        }
    }    
}

