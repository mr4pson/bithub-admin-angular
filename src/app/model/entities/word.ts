import { CLang } from "./lang";
import { CTranslatableEntity, ITranslatableEntity, ITranslation } from "./_translatable.entity";

export class CWord extends CTranslatableEntity<IWordTranslation> {    
    public mark: string;
    public note: string;
    public pos: number;    
    
    public init(pos: number, ll: CLang[]): CWord {
        this.pos = pos;
        this.translations = ll.map(l => ({lang_id: l.id, text: ""}));        
        return this;
    }
}

export interface IWord extends ITranslatableEntity<IWordTranslation> {
    mark: string;
    note: string;
    pos: number;        
}

export interface IWordTranslation extends ITranslation {
    word_id?: number;
    text: string;
}
