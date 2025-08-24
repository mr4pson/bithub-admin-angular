import { Component } from '@angular/core';
import { CShopitem } from 'src/app/model/entities/shopitem';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
  selector: 'the-shopitem',
  templateUrl: './shopitem.component.html',
})
export class CShopitemComponent extends CEntityComponent<CShopitem> {
  get minimalPrice() {
    return this.x.min_items_num * this.x.price;
  }
}
