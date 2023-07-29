import { Component, OnDestroy, OnInit } from '@angular/core';
import { ServerAccessService } from '../shared/server-access.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  providers: [ServerAccessService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  isUserAuthenticated: boolean = false;
  constructor(private serverAccessService: ServerAccessService,
    private authService: AuthService,
    private router: Router) { }
  
  ngOnInit(): void {
    this.userSub = this.authService.authenticatedUser.subscribe((user) => {
      this.isUserAuthenticated = !!user;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.serverAccessService.saveRecipes();
  }

  onFetchData() {
    this.serverAccessService.fetchRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}