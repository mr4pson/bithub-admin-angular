import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CShoporder } from 'src/app/model/entities/shoporder';
import { IShopitem } from 'src/app/model/entities/shopitem';

@Component({
  selector: 'the-shoporder',
  templateUrl: './shoporder.component.html',
})
export class CShoporderComponent extends CEntityComponent<CShoporder> {
  getShopItemTranslation(shopItem: IShopitem) {
    return shopItem.translations.find(
      (translation) => translation.lang_id === this.thelang.id
    ).name;
  }
}
