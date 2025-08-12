import { Component } from '@angular/core';
import { CSlugableEntityComponent } from 'src/app/pages/slugable.entity.component';
import { CPage } from 'src/app/model/entities/page';

@Component({
    selector: "the-page",
    templateUrl: "./page.component.html",
})
export class CPageComponent extends CSlugableEntityComponent<CPage> {}
