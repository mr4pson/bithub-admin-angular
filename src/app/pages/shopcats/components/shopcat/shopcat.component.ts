import { Component } from '@angular/core';
import { CShopcat } from 'src/app/model/entities/shopcat';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
    selector: "the-shopcat",
    templateUrl: "./shopcat.component.html",
})
export class CShopcatComponent extends CEntityComponent<CShopcat> {}
