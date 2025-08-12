import { CEntity, IEntity } from "./_entity";

export class CReforder extends CEntity {
    public referrer_email: string;
    public referee_email: string;
    public amount: number;
    public created_at: Date;

    public build (o: IReforder): CReforder {
        for (let field in o) {
            if (field === "created_at") {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else {
                this[field] = o[field];
            }            
        }
        
        return this;
    }
}

export interface IReforder extends IEntity {
    readonly referrer_email: string;
    readonly referee_email: string;
    readonly amount: number;
    readonly created_at: string;
}
