import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: "ngx-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  getrememberMe = false;
  remCheck = false;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private toastrService: NbToastrService
  ) {
    this.registerForm = this.fb.group({
      username: ['',[Validators.required, Validators.minLength(6)]],
      email: ['',
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: ['',[Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  get formControls() {
    return this.registerForm.controls;
  }

  get username() {
    return this.registerForm.get("username");
  }
  get email() {
    return this.registerForm.get("email");
  }
  get password() {
    return this.registerForm.get("password");
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      this.submitted = true;
      return false;
    }else{
      this.authService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
          console.log("res",res)
          this.toastrService.success(res.massage)
          this.router.navigate(['auth/login'])
        },
        error:(error)=>{
          console.log("error",error)
          this.toastrService.danger("The email address you have entered is already associated with another account")
        }
      })
    }
  }
}
