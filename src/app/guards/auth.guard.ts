import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/Auth/auth.service';
import Swal from 'sweetalert2';

//AuthGuards
export const authGuard:CanActivateFn =(route,state) => {

  
  
  const currentmenu = route.url[0].path;
const router = inject(Router);
const service = inject(AuthService);

if(service.isLoggedIn()) {
  return true;
}
else{
  Swal.fire('','Please Login First','info')
  router.navigate(['/login']);
    return false;
}

}