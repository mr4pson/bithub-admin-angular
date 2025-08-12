import { CTranslatableEntity, ITranslatableEntity, ITranslation } from "./_translatable.entity";
import { CLang } from "./lang";

export class CTask extends CTranslatableEntity<ITaskTranslation> {
    public guide_id: number;
    public price: number;
    public time: number;
    public type: TTaskType;
    public contenttype: TTaskContentType;
    public yt_content: string;
    public pos: number;
    public actual_until: Date;
    public created_at: Date;

    public build(o: ITask | CTask): CTask {
        for (let field in o) {
            if (field === "translations") {
                this[field] = (window as any).structuredClone(o[field]); // sometimes we need to use "build" to clone the object, this will prevent coping inner objects by reference
            } else if (["actual_until", "created_at"].includes(field)) {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }

    public init(ll: CLang[]): CTask {
        this.price = 0;
        this.time = 0;
        this.type = "main";
        this.contenttype = "html";
        this.pos = 0;
        this.actual_until = null;
        this.translations = ll.map(l => ({lang_id: l.id, name: "", content: ""}));
        return this;
    }
}

export interface ITask extends ITranslatableEntity<ITaskTranslation> {
    readonly guide_id: number;
    readonly price: number;
    readonly time: number;
    readonly type: TTaskType;
    readonly contenttype: TTaskContentType;
    readonly yt_content: string;
    readonly pos: number;
    readonly actual_until: string;
    readonly created_at: string;    
}

export interface ITaskTranslation extends ITranslation {
    task_id?: number;
    name: string;
    content: string;  
}

export type TTaskType = "main" | "extra";
export type TTaskContentType = "html" | "yt";
