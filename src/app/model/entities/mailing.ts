import { CEntity, IEntity } from "./_entity";

export class CMailing extends CEntity {
    public subject: string;
    public content: string;
    public recipients: string;
    public status: TMailingStatus;
    public running_status: string;
    public created_at: Date;

    public build (o: IMailing): CMailing {
        for (let field in o) {
            if (field === "created_at") {
                this[field] = o[field] ? new Date(o[field]) : null;
            } else {
                this[field] = o[field];
            }
        }

        return this;
    }

    public init(): CMailing {
        return this;
    }
}

export interface IMailing extends IEntity {
    readonly subject: string;
    readonly content: string;
    readonly recipients: string;
    readonly status: TMailingStatus;
    readonly running_status: string;
    readonly created_at: string;
}

export type TMailingStatus = "idle" | "running" | "error";
