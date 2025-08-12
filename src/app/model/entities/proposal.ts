import { CEntity, IEntity } from "./_entity";
import { CUser, IUser } from "./user";

export class CProposal extends CEntity {
    public user_id: number;
    public content: string;
    public status: TProposalStatus;
    public created_at: Date;   
    // relations
    public user: CUser;

    public build(o: IProposal): CProposal {
        for (let field in o) {
            if (field === "created_at") {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else if (field === "user") {
                this[field] = o[field] ? new CUser().build(o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }
}

export type TProposalStatus = "created" | "accepted" | "rejected";

export interface IProposal extends IEntity {
    readonly user_id: number;
    readonly content: string;
    readonly status: TProposalStatus;
    readonly created_at: string;   
    // relations
    readonly user: IUser;
}
