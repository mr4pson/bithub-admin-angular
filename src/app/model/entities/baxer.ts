import { CTranslatableEntity, ITranslatableEntity, ITranslation } from "./_translatable.entity";
import { CLang } from "./lang";

export class CBaxer extends CTranslatableEntity<IBaxerTranslation> {
    public name: string;
    public pos: number;
    public active: boolean;

    public init(ll: CLang[]): CBaxer {        
        this.pos = 0;
        this.active = true;  
        this.translations = ll.map(l => ({lang_id: l.id, link: "", img: null}));       
        return this;
    }  
}

export interface IBaxer extends ITranslatableEntity<IBaxerTranslation> {
    readonly name: string;
    readonly pos: number;
    readonly active: boolean;    
}

export interface IBaxerTranslation extends ITranslation {
    baxer_id?: number;
    link: string;
    img: string | File;
}