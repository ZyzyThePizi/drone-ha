import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm!: FormGroup
  toke!: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router){}

 async ngOnInit() {
   this.loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
   })
  }

   onSubmit(){
    this.http.post('https://cssna.teknologija.com/api/auth', this.loginForm.getRawValue(), {withCredentials: true})
    .subscribe( (res: any)=> {
      localStorage.setItem('token', res.accessToken)
      alert('Login succesfull.')
      this.router.navigate(['/drones'])
    })
  }


}
