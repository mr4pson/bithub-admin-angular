import { CEntity, IEntity } from './_entity';

export class CAdminGroup extends CEntity {    
    public name: string;    
}

export interface IAdminGroup extends IEntity {
    name: string;
}

