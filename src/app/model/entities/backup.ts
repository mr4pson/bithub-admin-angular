import { CEntity, IEntity } from "./_entity";

export class CBackup extends CEntity {
    public filename: string;
    public type: TBackupType;
    public ready: boolean;
    public created_at: Date;

    public build (o: Object): CBackup {
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

export interface IBackup extends IEntity {
    filename: string;
    type: TBackupType;
    ready: boolean;
    created_at: string;
}

export type TBackupType = "files" | "db";
