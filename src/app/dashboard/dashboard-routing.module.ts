import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dashboardsRoutes } from './dashboard.routes';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes : Routes = [
  {
   path : '', 
   component : DashboardComponent, 
   children : dashboardsRoutes, 
  //  canActivate : [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports : [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
