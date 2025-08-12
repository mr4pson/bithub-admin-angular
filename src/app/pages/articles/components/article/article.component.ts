import { Component } from '@angular/core';
import { CArticle } from 'src/app/model/entities/article';
import { CSlugableEntityComponent } from 'src/app/pages/slugable.entity.component';

@Component({
    selector: "the-article",
    templateUrl: "./article.component.html",
})
export class CArticleComponent extends CSlugableEntityComponent<CArticle> {}
