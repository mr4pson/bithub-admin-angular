import { CEntity, IEntity } from "./_entity";

export class CUser extends CEntity {
    public uuid: string;
    public lang_id: number;
    public parent_id: number;
    public referrer_id: number;
    public email: string;
    public password: string;
    public name: string;
    public wallet: string;
    public img: string;
    public active: boolean;
    public money: number;
    public points: number;
    public paid_at: Date;
    public paid_until: Date;
    public children_limit: number;
    public freetasks: number;
    public freetask_viewed_at: Date;
    public referral_percent: number;
    public tg_id: number;
    public tg_active: boolean;
    public tg_tasks: boolean;
    public tg_guides: boolean;
    public tg_articles: boolean;
    public tg_deadlines: boolean;
    public tg_invite: string;
    public tz: number;
    public created_at: Date;
    // relations
    public parent?: CUser;
    public referrer?: CUser;

    public build(o: IUser): CUser {
        for (let field in o) {
            if (["paid_at", "paid_until", "created_at", "freetask_viewed_at"].includes(field)) {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else if (["parent", "referrer"].includes(field)) {
                this[field] = o[field] ? new CUser().build(o[field]) : null;
            } else {
                this[field] = o[field];
            }
        }

        return this;
    }

    public init(): CUser {
        this.lang_id = 1;
        this.parent_id = null;
        this.referrer_id = null;
        this.active = true;
        this.money = 0;
        this.points = 0;
        this.paid_at = null;
        this.paid_until = null;
        this.children_limit = 0;
        this.freetasks = 0;
        this.freetask_viewed_at = null;
        this.referral_percent = 20;
        this.tg_id = null;
        this.tg_active = false;
        this.tg_tasks = true;
        this.tg_guides = true;
        this.tg_articles = true;
        this.tg_deadlines = true;
        this.tg_invite = null;
        this.tz = 0;
        return this;
    }
}

export interface IUser extends IEntity {
    readonly uuid: string;
    readonly lang_id: number;
    readonly parent_id: number;
    readonly referrer_id: number;
    readonly email: string;
    readonly name: string;
    readonly wallet: string;
    readonly img: string;
    readonly active: boolean;
    readonly money: number;
    readonly points: number;
    readonly paid_at: string;
    readonly paid_until: string;
    readonly children_limit: number;
    readonly freetasks: number;
    readonly freetask_viewed_at: string;
    readonly referral_percent: number;
    readonly tg_id: number;
    readonly tg_active: boolean;
    readonly tg_tasks: boolean;
    readonly tg_guides: boolean;
    readonly tg_articles: boolean;
    readonly tg_deadlines: boolean;
    readonly tg_invite: string;
    readonly tz: number;
    readonly created_at: string;
    // relations
    readonly parent?: IUser;
    readonly referrer?: IUser;
}

