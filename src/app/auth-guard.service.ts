import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService:AuthServiceService, private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot,
    state:RouterStateSnapshot):Observable<boolean>|Promise<boolean>|boolean
    {
      return this.authService.isAuthenticated().then((data:any)=>{
        return true;


      }).catch(()=>{
        this.router.navigate(['/']);
        return false;
      })
     
    //  if(this.authService.loggedIn)
    //   {
    //     console.log(this.authService.loggedIn)
    //     return true;
    //   }
    //   else{
    //     this.router.navigate(['/'])
    //     return false;
    //   }
    }
}
