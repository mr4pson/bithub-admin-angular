import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CComponentsModule } from "src/app/components/components.module";
import { CDirectivesModule } from "src/app/directives/directives.module";
import { CHomePage } from "./home.page";

@NgModule({	
    imports: [	
		CommonModule,
		RouterModule,
        FormsModule,        
		CComponentsModule,
		CDirectivesModule,
	],
	declarations: [
		CHomePage,
	],    		    
})
export class CHomeModule {}