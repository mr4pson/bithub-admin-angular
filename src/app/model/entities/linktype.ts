import { CEntity, IEntity } from "./_entity";

export class CLinktype extends CEntity {
    public name: string;
    public img: string;

    public init(): CLinktype {
        return this;
    }
}

export interface ILinktype extends IEntity {
    name: string;
    img: string;
}
