import { Component, OnInit } from '@angular/core';
import { RegistrationDTO } from '../dto/drone.registrationDTO';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DroneService } from '../services/drone.service';

@Component({
  selector: 'app-drone-detail',
  templateUrl: './drone-detail.component.html',
  styleUrls: ['./drone-detail.component.css']
})
export class DroneDetailComponent implements OnInit {
  
  drone!: RegistrationDTO;

  constructor(
    private route: ActivatedRoute,
    private droneService: DroneService,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id: string = params.get("id") as string;
      this.droneService.getDroneById(+id).subscribe((res: RegistrationDTO) => {
        this.drone = res;
      });
    });
  }

  onBack() {
    this.router.navigate(['/drones']);
  }

}
