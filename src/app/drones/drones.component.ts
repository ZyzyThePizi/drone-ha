import { Component, OnInit } from '@angular/core';
import { RegistrationDTO } from '../dto/drone.registrationDTO';
import { DroneService } from '../services/drone.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/drone.authService';
import { ExportFiles } from '../exports/export.to-excel';

@Component({
  selector: 'app-drones',
  templateUrl: './drones.component.html',
  styleUrls: ['./drones.component.css']
})
export class DronesComponent implements OnInit {

  admin! : any 
  manager!: any
  brandM!: number

  registrations: RegistrationDTO[] = []
  

  constructor(private droneService: DroneService,private router: Router, private auth: AuthService, private exportFiles: ExportFiles){}

  async ngOnInit() {
      await this.initRegistrations()
      this.admin=   this.auth.isAdmin();
      this.manager =  this.auth.isDataManager();
  }

  async initRegistrations() {
    await this.droneService.getRegistrations().subscribe((res: RegistrationDTO[]) => {
       this.registrations = res;
       this.brandM=Math.max(...res.map(x => x.brandId))
      /* console.log(this.registrations) */
    })
  }

  onView(id: number) {
    this.router.navigate(['/drones/' + id])
  }

  onDelete(id: number) {
    this.droneService.deleteRegistration(id).subscribe((res: RegistrationDTO)=>{ 
      alert('Drone wtih '+ id + ' id was deleted.')
     window.location.reload()
    })
  }

  onUpdate(id: number) {
    this.router.navigate(['/drones/update/' + id])
  }

  onExcel(){
    this.exportFiles.exportToExcel('table', this.brandM)
  }

  onPdf(){
    this.exportFiles.exportPdf('table', this.brandM)
  }
}
