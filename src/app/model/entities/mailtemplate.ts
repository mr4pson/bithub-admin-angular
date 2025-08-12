import { CLang } from "./lang";
import { CTranslatableEntity, ITranslatableEntity, ITranslation } from "./_translatable.entity";

export class CMailtemplate extends CTranslatableEntity<IMailtemplateTranslation> {
    public name: string;
    
    public init(ll: CLang[]): CMailtemplate {
        this.translations = ll.map(l => ({lang_id: l.id, subject: "", content: ""}));                 
        return this;
    }
}

export interface IMailtemplate extends ITranslatableEntity<IMailtemplateTranslation> {
    name: string;    
}

export interface IMailtemplateTranslation extends ITranslation {
    mailtemplate_id?: number;
    subject: string;
    content: string;
}
