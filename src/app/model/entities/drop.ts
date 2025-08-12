import { CTranslatableEntity, ITranslatableEntity, ITranslation } from "./_translatable.entity";
import { CLang } from "./lang";

export class CDrop extends CTranslatableEntity<IDropTranslation> {
    public name: string;
    public img: string;
    public drop: string;
    public early: boolean;
    public score: number;
    public spending_money: number;
    public spending_time: number;
    public term: number;
    public fundrising: string;
    public cat: string;
    public date: string;

    public build (o: IDrop): CDrop {
        for (let field in o) {
            if (field === "translations") {
                this[field] = (window as any).structuredClone(o[field]); // sometimes we need to use "build" to clone the object, this will prevent coping inner objects by reference
            } else {
                this[field] = o[field];
            }
        }

        return this;
    }

    public init(ll: CLang[]): CDrop {
        this.early = false;
        this.score = 0;
        this.spending_money = 0;
        this.spending_time = 0;
        this.term = 0;
        this.date = this.mysqlDate(new Date());
        this.translations = ll.map(l => ({lang_id: l.id, tasks: "", invest: "", link: ""}));
        return this;
    }
}

export interface IDrop extends ITranslatableEntity<IDropTranslation> {
    name: string;
    img: string;
    drop: string;
    early: boolean;
    score: number;
    spending_money: number;
    spending_time: number;
    term: number;
    fundrising: string;
    cat: string;
    date: string;
}

export interface IDropTranslation extends ITranslation {
    drop_id?: number;
    tasks: string;
    invest: string;
    link: string;
}
