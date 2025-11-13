import {
  CTranslatableEntity,
  ITranslatableEntity,
  ITranslation,
} from './_translatable.entity';
import { CLang } from './lang';
import { CToolcat, IToolcat } from './toolcat';

export class CTool extends CTranslatableEntity<IToolTranslation> {
  public toolcat_id: number;
  public slug: string;
  public canonical: string;
  public date: string;
  public img: string | File;
  public yt_content: string;
  public readtime: number;
  public active: boolean;
  // relations
  public toolcat?: CToolcat;

  public build(o: ITool): CTool {
    for (let field in o) {
      if (field === 'translations') {
        this[field] = (window as any).structuredClone(o[field]); // sometimes we need to use "build" to clone the object, this will prevent coping inner objects by reference
      } else if (field === 'toolcat') {
        this[field] = o[field] ? new CToolcat().build(o[field]) : null;
      } else {
        this[field] = o[field];
      }
    }

    return this;
  }

  public init(ll: CLang[]): CTool {
    this.toolcat_id = null;
    this.date = this.mysqlDate(new Date());
    this.readtime = 0;
    this.active = true;
    this.translations = ll.map((l) => ({
      lang_id: l.id,
      name: '',
      content: '',
      contentshort: '',
      title: '',
      description: '',
      h1: '',
      keywords: '',
    }));
    return this;
  }
}

export interface ITool extends ITranslatableEntity<IToolTranslation> {
  toolcat_id: number;
  slug: string;
  canonical: string;
  date: string;
  img: string;
  yt_content: string;
  readtime: number;
  active: boolean;
  // relations
  toolcat?: IToolcat;
}

export interface IToolTranslation extends ITranslation {
  tool_id?: number;
  name: string;
  content: string;
  contentshort: string;
  title: string;
  description: string;
  h1: string;
  keywords: string;
}
