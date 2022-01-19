import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{
constructor(private as: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree>{
        return this.as.user.pipe(
            take(1),
            map(user =>{
           const auth=!!user;
           if(auth){
               return true;
           }
           return this.router.createUrlTree(['/authentication']);
        }),
        )}
}