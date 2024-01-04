import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class DroneDetailGuard implements CanActivate {
    
    constructor(private router: Router) {
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log(route.url)
        const id: number = route.url.length == 2 ? +route.url[1].path : +route.url[2].path ;
        console.log(id)
        if (isNaN(id) || id < 1) {
            alert('Invalid drone id');
            this.router.navigate(["/drones"]);
            return false;
        }

        return true;
    }

}