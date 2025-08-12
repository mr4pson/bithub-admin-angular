import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CAuthService } from '../auth.service';

@Injectable()
export class CAuthGuard {    
    constructor (
        private authService: CAuthService,
        private router: Router,
    ) {}
    
    public canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {        
        if (this.authService.authData !== null) {
            return true;
        } 
            
        this.router.navigateByUrl ("/auth/login");
        return false;               
    }    
}
