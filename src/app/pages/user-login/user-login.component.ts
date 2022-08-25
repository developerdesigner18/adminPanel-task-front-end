import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  getrememberMe = false;
  remCheck = false;
  constructor(private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        (localStorage.getItem('email') ? localStorage.getItem('email') : ''), [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')],
    ],
      password: [
        (localStorage.getItem('password') ? localStorage.getItem('password') : ''),
        [Validators.required, Validators.minLength(6)],
      ],
      username: ['',[Validators.required, Validators.minLength(6)]],
    });
  }
  get formControls() { return this.loginForm.controls; }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get username() {
    return this.loginForm.get("username");
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.submitted = true;
      return false;
    }else{
      this.authService.addUserLogin(this.loginForm.value).subscribe({
        next:(res)=>{
          console.log("res",res)
          this.toastrService.success(res.massage)
          window.location.reload();
          // this.router.navigate(['pages/iot-dashboard'])
        },
        error:(error)=>{
          console.log("error",error.error.message)
          this.toastrService.danger(error.error.message)
        }
      })
    }
  }
}
