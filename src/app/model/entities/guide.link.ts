import { IEntity } from "./_entity";

export interface IGuideLink extends IEntity {
    readonly guide_id?: number;
    readonly linktype_id: number;
    readonly value: string;
    readonly pos: number;     
}
