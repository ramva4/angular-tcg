import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  /* Load the latest user [take(1)] and automatically unsubscribe */
  return inject(AuthService).authenticatedUser.pipe(take(1), map((user) => {
    if (!!user) {
      /* Return true to indicate this area can be accessed */
      return true;
    } else {
      /* Return urlTree redirecting the user to '/auth' */
      return router.createUrlTree([ '/auth' ]);
    }
  }));
};
