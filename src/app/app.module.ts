import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DroneService } from './services/drone.service';
import { LoginComponent } from './login/login.component';
import { DroneDetailComponent } from './drone-detail/drone-detail.component';
import { AddDroneComponent } from './add-drone/add-drone.component';
import { UpdateDroneComponent } from './update-drone/update-drone.component';
import { DronesComponent } from './drones/drones.component';
import { DroneDetailGuard } from './services/drone.detail-guard';
import { AuthGuard } from './services/drone.auth-guard';
import { AuthService } from './services/drone.authService';
import { ClerkGuard } from './services/drone.data-clerk-guard';
import { ExportFiles } from './exports/export.to-excel';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DroneDetailComponent,
    AddDroneComponent,
    UpdateDroneComponent,
    DronesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [DroneService, AuthService, DroneDetailGuard, AuthGuard, ClerkGuard, ExportFiles],
  bootstrap: [AppComponent]
})
export class AppModule { }
