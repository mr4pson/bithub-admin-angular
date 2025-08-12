import { Component } from '@angular/core';
import { CUser } from 'src/app/model/entities/user';
import { ITZ, timezones } from 'src/app/model/tz';
import { CEntityComponent } from 'src/app/pages/entity.component';

@Component({
    selector: "the-user",
    templateUrl: "user.component.html",
})
export class CUserComponent extends CEntityComponent<CUser> {
    public timezones: ITZ[] = timezones;    
}
