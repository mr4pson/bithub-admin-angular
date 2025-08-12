import { CEntity, IEntity } from "./_entity";

export class CShoporder extends CEntity {
    public shopitem_id: number;
    public email: string;
    public tg: string;
    public comment: string;
    public status: TShoporderStatus;
    public created_at: Date;

    public build (o: IShoporder): CShoporder {
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

export type TShoporderStatus = "created" | "completed" | "rejected";

export interface IShoporder extends IEntity {
    shopitem_id: number;
    email: string;
    tg: string;
    comment: string;
    status: TShoporderStatus;
    created_at: string;
}
