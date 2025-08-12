import { CEntity, IEntity } from './_entity';
import { IAdminGroup } from './admin.group';

export class CAdmin extends CEntity {        
    public group_id: number;
    public name: string;
    public email: string;
    public password: string;
    public img: string | File;    
    public active: boolean;    
    // relations 
    public group?: IAdminGroup;
    
    public init(): CAdmin {
        this.group_id = 1;
        this.active = true;     
        return this;
    }
}

export interface IAdmin extends IEntity {
    group_id: number;
    name: string;
    email: string;
    img: string;    
    active: boolean;    
    // relations 
    group?: IAdminGroup;
}
