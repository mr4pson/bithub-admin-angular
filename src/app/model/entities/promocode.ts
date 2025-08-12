import { CEntity, IEntity } from "./_entity";

export class CPromocode extends CEntity {
    public code: string;
    public discount: number;
    public limit: TPromocodeLimit;
    public activation_limit: number;
    public date_limit: Date;
    public created_at: Date;

    public build(o: IPromocode): CPromocode {
        for (let field in o) {
            if (["date_limit", "created_at"].includes(field)) {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }

    public init(): CPromocode {
        this.discount = 0;
        this.limit = "activation";
        this.activation_limit = 1;
        this.date_limit = new Date();
        return this;
    }
}

export type TPromocodeLimit = "activation" | "date"; // лимит количества активаций или лимит срока действия

export interface IPromocode extends IEntity {
    code: string;
    discount: number;
    limit: TPromocodeLimit;
    activation_limit: number;
    date_limit: string;
    created_at: string;
}

