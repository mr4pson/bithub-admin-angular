import { CEntity, IEntity } from "./_entity";

export class CInorder extends CEntity {
    public outer_id: string;
    public user_email: string;
    public expected_amount: number;
    public received_amount: number;
    public completed: boolean;
    public created_at: Date;    

    public build (o: IInorder): CInorder {
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

export interface IInorder extends IEntity {
    outer_id: string;
    user_email: string;
    expected_amount: number;
    received_amount: number;
    completed: boolean;
    created_at: string;    
}

