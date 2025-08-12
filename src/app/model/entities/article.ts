import { CTranslatableEntity, ITranslatableEntity, ITranslation } from "./_translatable.entity";
import { CArtcat, IArtcat } from "./artcat";
import { CLang } from "./lang";

export class CArticle extends CTranslatableEntity<IArticleTranslation> {
    public artcat_id: number;
    public slug: string;
    public date: string;
    public img: string | File;
    public yt_content: string;
    public readtime: number;
    public active: boolean;
    // relations
    public artcat?: CArtcat;

    public build (o: IArticle): CArticle {
        for (let field in o) {
            if (field === "translations") {
                this[field] = (window as any).structuredClone(o[field]); // sometimes we need to use "build" to clone the object, this will prevent coping inner objects by reference
            } else if (field === "artcat") {
                this[field] = o[field] ? new CArtcat().build(o[field]) : null;
            } else {
                this[field] = o[field];
            }
        }

        return this;
    }

    public init(ll: CLang[]): CArticle {
        this.artcat_id = null;
        this.date = this.mysqlDate(new Date());
        this.readtime = 0;
        this.active = true;
        this.translations = ll.map(l => ({lang_id: l.id, name: "", content: "", contentshort: "",  title: "", description: "", h1: "", keywords: ""}));
        return this;
    }
}

export interface IArticle extends ITranslatableEntity<IArticleTranslation> {
    artcat_id: number;
    slug: string;
    date: string;
    img: string;
    yt_content: string;
    readtime: number;
    active: boolean;
    // relations
    artcat?: IArtcat;
}

export interface IArticleTranslation extends ITranslation {
    article_id?: number;
    name: string;
    content: string;
    contentshort: string;
    title: string;
    description: string;
    h1: string;
    keywords: string;
}
