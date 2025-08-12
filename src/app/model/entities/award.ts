import { CTranslatableEntity, ITranslatableEntity, ITranslation } from "./_translatable.entity";
import { CLang } from "./lang";

export class CAward extends CTranslatableEntity<IAwardTranslation> {
    public img: string;
    public investments: number;
    public earnings: number;
    public date: string;
    public active: boolean;

    public init(ll: CLang[]): CAward {
        this.investments = 0;
        this.earnings = 0;
        this.date = this.mysqlDate(new Date());        
        this.active = true;
        this.translations = ll.map(l => ({lang_id: l.id, name: ""})); 
        return this;
    }
}

export interface IAward extends ITranslatableEntity<IAwardTranslation> {
    readonly img: string;
    readonly investments: number;
    readonly earnings: number;
    readonly date: string;
    readonly active: boolean;
}

export interface IAwardTranslation extends ITranslation {
    award_id?: number;
    name: string;    
}
