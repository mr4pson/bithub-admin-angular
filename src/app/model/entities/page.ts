import { IChildable } from "../childable.interface";
import { CLang } from "./lang";
import { CTranslatableEntity, ITranslatableEntity, ITranslation } from "./_translatable.entity";

export class CPage extends CTranslatableEntity<IPageTranslation> implements IChildable {
    public parent_id: number;
    public slug: string;
    public img: string | File;
    public pos: number;
    public active: boolean;
    public menumain: boolean;
    public menufoot: boolean;
    // relations
    public children?: CPage[];

    public init(ll: CLang[]): CPage {
        this.parent_id = null;
        this.pos = 0;
        this.active = true;
        this.menumain = true;
        this.menufoot = true;
        this.translations = ll.map(l => ({lang_id: l.id, name: "", content: "", title: "", description: "", h1: ""})); 
        return this;
    }
}

export interface IPage extends ITranslatableEntity<IPageTranslation> {
    parent_id: number;
    slug: string;
    img: string;
    pos: number;
    active: boolean;
    menumain: boolean;
    menufoot: boolean;
    // relations
    children?: IPage[];
}

export interface IPageTranslation extends ITranslation {
    page_id?: number;
    name: string;
    content: string;
    title: string;
    description: string;
    h1: string;
}
