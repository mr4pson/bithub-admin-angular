import {
  CTranslatableEntity,
  ITranslatableEntity,
  ITranslation,
} from './_translatable.entity';
import { CLang } from './lang';

export class CToolcat extends CTranslatableEntity<IToolcatTranslation> {
  public pos: number;

  public init(ll: CLang[]): CToolcat {
    this.pos = 0;
    this.translations = ll.map((l) => ({ lang_id: l.id, name: '' }));
    return this;
  }
}

export interface IToolcat extends ITranslatableEntity<IToolcatTranslation> {
  pos: number;
}

export interface IToolcatTranslation extends ITranslation {
  toolcat_id?: number;
  name: string;
}
