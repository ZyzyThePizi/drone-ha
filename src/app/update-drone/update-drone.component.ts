import { Component, OnInit } from '@angular/core';
import { RegistrationDTO } from '../dto/drone.registrationDTO';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DroneService } from '../services/drone.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationAddDTO } from '../dto/drone.registrationAddDTO';
import { droneIdCardValidator } from '../validators/drone-ID-card.validators';
import { droneUpdateStateValidator } from '../validators/drone-update-state.validator';

@Component({
  selector: 'app-update-drone',
  templateUrl: './update-drone.component.html',
  styleUrls: ['./update-drone.component.css']
})
export class UpdateDroneComponent implements OnInit {

  drone!: RegistrationDTO | undefined;
  id! : string;

  droneForm!: FormGroup;
  droneUpdate!: RegistrationAddDTO
  modelM!: number;
  
  constructor(
    private route: ActivatedRoute,
    private droneService: DroneService,
    private formBuilder: FormBuilder, 
    private router: Router
  ) {

  }

  public async initData(){

    this.route.paramMap.subscribe(async (params: ParamMap) => {
      this.id = params.get("id") as string;
      this.drone = await this.droneService.getDroneById(+this.id).toPromise()
      
    });

    this.droneService.getRegistrations().subscribe((res: RegistrationDTO []) => {
      this.modelM=Math.max(...res.map(x => x.modelId))
    });
    this.droneForm = this.formBuilder.group({
      serialNumber: ['', Validators.required],
      modelId: ['', Validators.required],
      ownerIdCardNumber: ['', [ Validators.required ,droneIdCardValidator()]],
      ownerFirstName: ['', Validators.required],
      ownerLastName: ['', Validators.required],
      ownerContactNumber: ['', [ Validators.required ,Validators.minLength(8), Validators.min(0), Validators.pattern('^[0-9]+$')]],
      ownerEmailAddress: ['', [ Validators.required , Validators.email]]
    })
    /* this.droneForm.addValidators(Validators.required) */
  }

  async ngOnInit() {
    
    await this.initData();
     
   
  }

  submitForm() {
    this.droneUpdate = this.droneForm.value
    this.droneService.updateRegistration(+this.id , this.droneUpdate).subscribe((res: RegistrationAddDTO)=> {
      this.droneUpdate = res;
      alert('Update Succesful with ID: ' + this.id)
      this.router.navigate(['/drones'])
    })
  }


}
