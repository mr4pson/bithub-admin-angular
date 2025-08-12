import { CTranslatableEntity, ITranslatableEntity, ITranslation } from "./_translatable.entity";
import { CLang } from "./lang";

export class CTariff extends CTranslatableEntity<ITariffTranslation> {
    public type: TTariffType;
    public price: number;
    public period: number;
    public code: string;
    public top: boolean;
    public pos: number;
    
    public init(ll: CLang[]): CTariff {
        this.type = "subscription";
        this.price = 1;
        this.period = 1;
        this.top = false;
        this.pos = 0;
        this.translations = ll.map(l => ({lang_id: l.id, name: "", note: ""}));
        return this;
    }
}

export type TTariffType = "subscription" | "onetime";

export interface ITariff extends ITranslatableEntity<ITariffTranslation> {
    type: TTariffType;
    price: number;
    period: number;
    code: string;
    top: boolean;
    pos: number;    
}

export interface ITariffTranslation extends ITranslation {
    tariff_id?: number;
    name: string;
    note: string;
}
