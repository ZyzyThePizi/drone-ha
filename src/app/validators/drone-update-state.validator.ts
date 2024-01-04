import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { RegistrationDTO } from "../dto/drone.registrationDTO";

export function droneUpdateStateValidator(drone: RegistrationDTO | undefined): ValidatorFn{

    return (control:AbstractControl): ValidationErrors | null => {

   


        // check if value is null
        console.log(control.value['serialNumber'])
        const isNull  =   true 

        // if the form value is the same as the api's

        const same = true


        const isValid = same && isNull

        return !isValid ? {droneIdCardValidator: true}: null;


    }


}