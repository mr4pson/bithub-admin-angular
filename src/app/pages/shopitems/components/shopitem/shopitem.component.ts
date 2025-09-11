import { Component, OnInit } from '@angular/core';
import { CShopitem } from 'src/app/model/entities/shopitem';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
  selector: 'the-shopitem',
  templateUrl: './shopitem.component.html',
})
export class CShopitemComponent
  extends CEntityComponent<CShopitem>
  implements OnInit
{
  applyDiscount = false;

  get minimalPrice() {
    return this.x.min_items_num * this.x.price;
  }

  public ngOnInit(): void {
    super.ngOnInit();

    this.applyDiscount = !!this.x.discount;
  }

  public handleApplyDiscountChange(value: boolean) {
    if (!value) {
      this.x.discount = 0;
    }
  }
}
