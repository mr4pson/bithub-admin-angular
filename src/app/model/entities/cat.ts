import { CTranslatableEntity, ITranslatableEntity, ITranslation } from "./_translatable.entity";
import { CLang } from "./lang";

export class CCat extends CTranslatableEntity<ICatTranslation> {
    public paid: boolean;
    public pos: number;

    public init(ll: CLang[]): CCat {
        this.paid = false;
        this.pos = 0;
        this.translations = ll.map(l => ({lang_id: l.id, name: ""}));
        return this;
    }
}

export interface ICat extends ITranslatableEntity<ICatTranslation> {
    paid: boolean;
    pos: number;
}

export interface ICatTranslation extends ITranslation {
    cat_id?: number;
    name: string;
}
