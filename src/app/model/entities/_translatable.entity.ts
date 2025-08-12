import { CEntity, IEntity } from "./_entity";

export abstract class CTranslatableEntity<T extends ITranslation> extends CEntity {
    public translations?: T[];

    public build(o: Object): any {
        for (let field in o) {
            if (field === "translations") {
                this[field] = (window as any).structuredClone(o[field]); // sometimes we need to use "build" to clone the object, this will prevent coping inner objects by reference
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }

    public translation(lang_id: number): T {        
        return this.translations?.find(t => t.lang_id === lang_id);
    }
}

export interface ITranslatableEntity<T extends ITranslation> extends IEntity {
    translations?: T[];
}

export interface ITranslation {
    id?: number;
    lang_id: number;
}


