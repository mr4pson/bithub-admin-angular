import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CShoporder } from 'src/app/model/entities/shoporder';

@Component({
    selector: "the-shoporder",
    templateUrl: "./shoporder.component.html",
})
export class CShoporderComponent extends CEntityComponent<CShoporder> {}
