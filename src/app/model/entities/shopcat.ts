import { CTranslatableEntity, ITranslatableEntity, ITranslation } from "./_translatable.entity";
import { CLang } from "./lang";

export class CShopcat extends CTranslatableEntity<IShopcatTranslation> {
    public pos: number;

    public init(ll: CLang[]): CShopcat {
        this.pos = 0;
        this.translations = ll.map(l => ({lang_id: l.id, name: ""}));
        return this;
    }
}

export interface IShopcat extends ITranslatableEntity<IShopcatTranslation> {
    pos: number;
}

export interface IShopcatTranslation extends ITranslation {
    shopcat_id?: number;
    name: string;
}
