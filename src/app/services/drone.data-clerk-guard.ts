import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from "@angular/router";
import { AuthService } from "./drone.authService";

@Injectable()
export class ClerkGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthService) {
    }

    async canActivate(route: ActivatedRouteSnapshot){
        if( route.url[1].path == 'update'  && await this.auth.isDataClerk() ){
            alert('Missing roles. Only Managers and Admins allowed.')
            this.router.navigate(['/login'])
            return false;
        }
        return true;
    }
}