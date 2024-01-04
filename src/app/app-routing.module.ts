import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DronesComponent } from './drones/drones.component';
import { DroneDetailComponent } from './drone-detail/drone-detail.component';
import { LoginComponent } from './login/login.component';
import { AddDroneComponent } from './add-drone/add-drone.component';
import { DroneDetailGuard } from './services/drone.detail-guard';
import { UpdateDroneComponent } from './update-drone/update-drone.component';
import { AuthGuard } from './services/drone.auth-guard';
import { ClerkGuard } from './services/drone.data-clerk-guard';

const routes: Routes = [
  {path: 'drones', component: DronesComponent, canActivate: [ AuthGuard ]},
  {path: 'drones/:id', component: DroneDetailComponent, canActivate: [AuthGuard ,DroneDetailGuard]},
  {path: 'drones/update/:id', component: UpdateDroneComponent, canActivate: [AuthGuard , ClerkGuard,DroneDetailGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'drones', component: DronesComponent, canActivate: [ AuthGuard ]},
  {path: 'drone_reg', component: AddDroneComponent, canActivate: [ AuthGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
