import { CEntity, IEntity } from './_entity';

export class CLang extends CEntity {
    public slug: string;
    public title: string;
    public shorttitle: string;
    public img: string | File;
    public slugable: boolean;
    public dir: TDir;
    public dateformat: TDateFormat;
    public locale: string;
    public pos: number;
    public active: boolean;

    public init(): CLang {
        this.slugable = false;
        this.dir = "ltr";
        this.dateformat = "en";
        this.pos = 0;
        this.active = true;
        return this;
    }
}

export interface ILang extends IEntity {
    slug: string;
    title: string;
    shorttitle: string;
    img: string;
    slugable: boolean;
    dir: TDir;
    dateformat: TDateFormat;
    locale: string;
    pos: number;
    active: boolean;
}

// [mm/dd/yyyy], [Month dd, yyyy]
// [dd.mm.yyyy], [dd month yyyy]
export type TDateFormat = "en" | "ru";

export type TDir = "ltr" | "rtl";
