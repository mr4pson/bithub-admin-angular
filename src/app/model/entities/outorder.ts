import { CEntity, IEntity } from "./_entity";

export class COutorder extends CEntity {
    public user_email: string;
    public amount: number;
    public purpose: string;
    public promocode: string;
    public created_at: Date;    

    public build (o: IOutorder): COutorder {
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

export interface IOutorder extends IEntity {
    user_email: string;
    amount: number;
    purpose: string;
    promocode: string;
    created_at: string;    
}

