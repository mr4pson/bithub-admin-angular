import {
  CTranslatableEntity,
  ITranslatableEntity,
  ITranslation,
} from './_translatable.entity';
import { CShopcat, IShopcat } from './shopcat';
import { CLang } from './lang';

export class CShopitem extends CTranslatableEntity<IShopitemTranslation> {
  public shopcat_id: number;
  public date: string;
  public img: string | File;
  public price: number;
  public min_items_num: number;
  public available_for?: string;
  public active: boolean;
  // relations
  public shopcat?: CShopcat;

  public build(o: IShopitem): CShopitem {
    for (let field in o) {
      if (field === 'translations') {
        this[field] = (window as any).structuredClone(o[field]); // sometimes we need to use "build" to clone the object, this will prevent coping inner objects by reference
      } else if (field === 'shopcat') {
        this[field] = o[field] ? new CShopcat().build(o[field]) : null;
      } else {
        this[field] = o[field];
      }
    }

    return this;
  }

  public init(ll: CLang[]): CShopitem {
    this.shopcat_id = null;
    this.date = this.mysqlDate(new Date());
    this.price = 0;
    this.active = true;
    this.translations = ll.map((l) => ({
      lang_id: l.id,
      name: '',
      content: '',
      contentshort: '',
    }));
    return this;
  }
}

export interface IShopitem extends ITranslatableEntity<IShopitemTranslation> {
  shopcat_id: number;
  date: string;
  img: string;
  price: number;
  active: boolean;
  // relations
  shopcat?: IShopcat;
}

export interface IShopitemTranslation extends ITranslation {
  shopitem_id?: number;
  name: string;
  content: string;
  contentshort: string;
}
