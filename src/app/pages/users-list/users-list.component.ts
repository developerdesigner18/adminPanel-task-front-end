import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'ngx-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  userDatas:any;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.getAllUsersList();
  }

  getAllUsersList(){
    this.authService.getAllUsers().subscribe({
      next:(res)=>{
        this.userDatas = res.data
        console.log("res",res)
      },
      error:(error)=>{
        console.log("error",error)
      }
    })
  }

}
