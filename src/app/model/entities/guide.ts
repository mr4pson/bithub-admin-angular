import { GuideTypes } from '../guide-type.enum';
import {
  CTranslatableEntity,
  ITranslatableEntity,
  ITranslation,
} from './_translatable.entity';
import { CCat, ICat } from './cat';
import { IGuideLink } from './guide.link';
import { CLang } from './lang';
import { CTask, ITask } from './task';

export class CGuide extends CTranslatableEntity<IGuideTranslation> {
  public cat_id: number;
  public img: string;
  public invest: number;
  //public twitter_score: number;
  //public twitter_username: string;
  public bh_score: number;
  public earnings: TGuideEarnings;
  public status: TGuideStatus;
  public hit: boolean;
  public active: boolean;
  public created_at: Date;
  public type: GuideTypes;
  public steps_limit?: number;
  // relations
  public links?: IGuideLink[];
  public tasks?: CTask[];
  public cat?: CCat;

  public build(o: IGuide): CGuide {
    for (let field in o) {
      if (field === 'translations') {
        this[field] = (window as any).structuredClone(o[field]); // sometimes we need to use "build" to clone the object, this will prevent coping inner objects by reference
      } else if (field === 'created_at') {
        this[field] = o[field] ? new Date(o[field]) : null;
      } else if (field === 'tasks') {
        this[field] = o[field].map((t) => new CTask().build(t));
      } else if (field === 'cat') {
        this[field] = o[field] ? new CCat().build(o[field]) : null;
      } else {
        this[field] = o[field];
      }
    }

    return this;
  }

  public init(ll: CLang[]): CGuide {
    this.cat_id = null;
    this.invest = 0;
    //this.twitter_score = 0;
    this.bh_score = 0;
    this.earnings = 'none';
    this.status = 'current';
    this.hit = false;
    this.active = true;
    this.translations = ll.map((l) => ({
      lang_id: l.id,
      name: '',
      content: '',
      contentshort: '',
    }));
    this.links = [];
    this.tasks = [];
    return this;
  }
}

export interface IGuide extends ITranslatableEntity<IGuideTranslation> {
  readonly cat_id: number;
  readonly img: string;
  readonly invest: number;
  //readonly twitter_score: number;
  //readonly twitter_username: string;
  readonly bh_score: number;
  readonly earnings: TGuideEarnings;
  readonly status: TGuideStatus;
  readonly active: boolean;
  readonly created_at: string;
  // relations
  readonly links?: IGuideLink[];
  readonly tasks?: ITask[];
  readonly cat?: ICat;
}

export interface IGuideTranslation extends ITranslation {
  guide_id?: number;
  name: string;
  content: string;
  contentshort: string;
}

export type TGuideStatus = 'current' | 'ending' | 'expired';

export type TGuideEarnings =
  | 'none'
  | 'drop'
  | 'possible_drop'
  | 'early_access'
  | 'points';
