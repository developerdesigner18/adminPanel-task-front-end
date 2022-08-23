import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: any;
  email: any;
  constructor(public authService: AuthService,) { }

  ngOnInit(): void {
    let id = localStorage.getItem("_id")
    console.log("token",id);
    this.authService.getProfileData(id).subscribe({
      next:(res)=>{
        this.name = res.data.username
        this.email = res.data.email
      },
      error:(error)=>{
        console.log("error",error);

      }
    })

  }

}
