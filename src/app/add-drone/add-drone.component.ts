import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationAddDTO } from '../dto/drone.registrationAddDTO';
import { DroneService } from '../services/drone.service';
import { droneIdCardValidator } from '../validators/drone-ID-card.validators';
import { RegistrationDTO } from '../dto/drone.registrationDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-drone',
  templateUrl: './add-drone.component.html',
  styleUrls: ['./add-drone.component.css']
})
export class AddDroneComponent implements OnInit {
  
  droneForm!: FormGroup;
  drone!: RegistrationAddDTO
  modelM!: number;
  mId!: number;

  constructor(private droneService: DroneService, private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.droneService.getRegistrations().subscribe((res: RegistrationDTO []) => {
      this.modelM=Math.max(...res.map(x => x.modelId))
      this.mId=Math.max(...res.map(x => x.id))+1
    }) 
    this.droneForm = this.formBuilder.group({
      serialNumber: ['', Validators.required],
      modelId: ['', Validators.required],
      ownerIdCardNumber: ['', [Validators.required, droneIdCardValidator()]],
      ownerFirstName: ['', Validators.required],
      ownerLastName: ['', Validators.required],
      ownerContactNumber: ['', [Validators.required, Validators.minLength(8), Validators.min(0), Validators.pattern('^[0-9]+$')]],
      ownerEmailAddress: ['', [Validators.required, Validators.email]]
    })
  }

  submitForm() {
    this.drone = this.droneForm.value
    this.droneService.postRegistration(this.drone).subscribe((res: RegistrationAddDTO)=> {
      this.drone = res;
      alert('Registration Succesful with ID: ' + this.mId)
      this.router.navigate(['/drones'])
    })
  }

}
