import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function droneIdCardValidator(): ValidatorFn{

    return (control:AbstractControl): ValidationErrors | null => {

        const value : string = control.value
        
        
        // numeric string without last character

        const numeric  =  /^[0-9]+$/.test(value.slice(0, -1))

        // if last character is alphabetical

        const alpha = /[a-zA-Z]$/.test(value.substring(value.length - 1))

        let isValid: boolean
         if(value !='') isValid = alpha && numeric
         else isValid = true 
        
        return !isValid ? {droneIdCardValidator: true}: null;


    }


}