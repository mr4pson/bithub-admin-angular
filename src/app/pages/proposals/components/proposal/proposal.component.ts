import { Component } from '@angular/core';
import { CEntityComponent } from 'src/app/pages/entity.component';
import { CProposal } from 'src/app/model/entities/proposal';

@Component({
    selector: "the-proposal",
    templateUrl: "./proposal.component.html",
})
export class CProposalComponent extends CEntityComponent<CProposal> {}
