import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {map, tap} from "rxjs/internal/operators";
import {AuthService} from "../auth/auth.service";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.isAuth().pipe(tap(b=>{
      if(b) this.router.navigate(['/'])
    })).pipe(map(e=>!e));
  }

  constructor(private router:Router,private auth:AuthService) { }
}
