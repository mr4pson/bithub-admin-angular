import { CTranslatableEntity, ITranslatableEntity, ITranslation } from "./_translatable.entity";
import { CLang } from "./lang";

export class CArtcat extends CTranslatableEntity<IArtcatTranslation> {
    public pos: number;
    
    public init(ll: CLang[]): CArtcat {
        this.pos = 0;
        this.translations = ll.map(l => ({lang_id: l.id, name: ""})); 
        return this;
    }
}

export interface IArtcat extends ITranslatableEntity<IArtcatTranslation> {
    pos: number;    
}

export interface IArtcatTranslation extends ITranslation {
    artcat_id?: number;
    name: string;
}
