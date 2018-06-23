import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable, of} from "rxjs/index";
import {tap} from "rxjs/internal/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.isAuth().pipe(tap(b=>{
      if(!b) this.router.navigate(['/login'])
    }));
  }

  constructor(private router:Router,private auth:AuthService) { }
}

