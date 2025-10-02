import { CEntity, IEntity } from './_entity';

export class CWithdraworder extends CEntity {
  public email: string;
  public amount: number;
  public wallet: string;
  public tg: string;
  public comment: string;
  public completed: boolean;
  public created_at: Date;

  public build(o: IWithdraworder): CWithdraworder {
    for (let field in o) {
      if (field === 'created_at') {
        this[field] = o[field] ? new Date(o[field]) : null;
      } else {
        this[field] = o[field];
      }
    }

    return this;
  }
}

export interface IWithdraworder extends IEntity {
  email: string;
  amount: number;
  wallet: string;
  tg: string;
  comment: string;
  completed: boolean;
  created_at: string;
}
