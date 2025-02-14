import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, Router, RouterStateSnapshot } from '@angular/router';
import { ConnectService } from './connect.service';

export @Injectable({
  providedIn: 'root'
})
class AuthGuard2Service {

  constructor(private router: Router, private ConnectService: ConnectService) { }
  canActivate() {
    this.ConnectService.currentData.subscribe(data => {
      if (data.username!=="") {
        return true;
      }
      this.router.navigate(['/home'])

      return false;
    });
  }
  
}