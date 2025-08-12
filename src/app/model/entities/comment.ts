import { CEntity, IEntity } from "./_entity";
import { CGuide, IGuide } from "./guide";
import { CUser, IUser } from "./user";

export class CComment extends CEntity {
    public user_id: number;
    public guide_id: number;
    public is_admin: boolean;
    public content: string;
    public active: boolean;
    public created_at: Date;
    // relations
    public user?: CUser;
    public guide?: CGuide;

    public build(o: IComment): CComment {
        for (let field in o) {
            if (field === "created_at") {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else if (field === "user") {
                this[field] = o[field] ? new CUser().build(o[field]) : null;
            } else if (field === "guide") {
                this[field] = o[field] ? new CGuide().build(o[field]) : null;
            } else {
                this[field] = o[field];
            }
        }

        return this;
    }

    public init(): CComment {
        this.user_id = null;
        this.guide_id = null;
        this.is_admin = false;
        this.active = true;
        return this;
    }
}

export interface IComment extends IEntity {
    readonly user_id: number;
    readonly guide_id: number;
    readonly is_admin: boolean;
    readonly content: string;
    readonly active: boolean;
    readonly created_at: string;
    // relations
    readonly user?: IUser;
    readonly guide?: IGuide;
}
