import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  getrememberMe = false;
  remCheck = false;

  constructor(private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,private toastrService: NbToastrService) {
      this.loginForm = this.fb.group({
        email: [
          (localStorage.getItem('email') ? localStorage.getItem('email') : ''), [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
      ],
        password: [
          (localStorage.getItem('password') ? localStorage.getItem('password') : ''),
          [Validators.required, Validators.minLength(6)],
        ],
      });
     }

  ngOnInit(): void {
    if (localStorage.getItem('email') !== null && localStorage.getItem('password') !== null) {
      this.remCheck = true;
    }
    // this.authService.checktoken()
  }

  get formControls() { return this.loginForm.controls; }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit() {
  if (!this.loginForm.valid) {
    this.submitted = true;
    return false;
  }else{
    this.authService.login(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log("res",res)
        localStorage.setItem('token',res.token)
        localStorage.setItem('_id',res.username_id)
        localStorage.setItem('role',res.role)
        this.toastrService.success(res.massage)
        setTimeout(() => {
          this.router.navigate(['pages/iot-dashboard'])
        },2000);
      },
      error:(error)=>{
        console.log("error",error.error.message)
        this.toastrService.danger(error.error.message)
      }
    })
  }
  // this.authService.login(this.email.value, this.password.value).subscribe((res) => {
  //   console.log("res", res)
  // });
    // if (this.authService.isLoggedIn() !== true) {
    //   this.loginForm.reset();
    //   this.submitted = false;
    // }
  }


  }

