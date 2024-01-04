import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./drone.authService";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auth: AuthService) {
    }

    canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(!this.auth.isAdmin() && !this.auth.isDataClerk() && !this.auth.isDataManager() ){
            alert('Missing roles. Please login.')
            this.router.navigate(['/login'])
            return false;
        }
        return true;
    }
}