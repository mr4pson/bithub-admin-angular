import { Directive } from '@angular/core';
import { ISlugable } from 'src/app/model/slugable.interface';
import { CAppService } from 'src/app/services/app.service';
import { CSlugService } from 'src/app/services/slug.service';
import { CEntityComponent } from './entity.component';

@Directive()
export abstract class CSlugableEntityComponent<T extends ISlugable> extends CEntityComponent<T> {    
    constructor(
        protected appService: CAppService,
        protected slugService: CSlugService,   
    ) 
    {
        super(appService);
    }

    public buildSlug(from: string): void {
        if (!this.x.id) {
            this.x.slug = this.slugService.buildSlug(from);
        }
    }
}
