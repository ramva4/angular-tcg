import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard';
import { ServerResolver } from './servers/server/server-resolver';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'servers',
    component: ServersComponent,
    canActivate: [AuthGuard],
    children: [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},        // This will be server/:id
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }        // This will be server/:id
    ]
  },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id/:name', component: UserComponent }
    ]
  },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ServersService, AuthGuard, AuthService, CanDeactivateGuard, ServerResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
