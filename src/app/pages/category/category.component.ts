import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  Cat_Form: FormGroup;
  CatEditForm: FormGroup;
  modelClose: boolean = false;
  submitted = false;
  datas:any;
  id: any;
  role: any;
  constructor(private fb: FormBuilder,
    public authService: AuthService,
    public router: Router,private toastrService: NbToastrService) {
      this.Cat_Form = this.fb.group({
        name: [
         '', [Validators.required],
        ]
      });


      this.CatEditForm = this.fb.group({
          ename: ['', [Validators.required],
        ]
      });

    }

  ngOnInit(): void {
    let id = localStorage.getItem("_id")
    this.authService.getProfileData(id).subscribe({
      next:(res)=>{
        this.role = res.data.role
      },
      error:(error)=>{
        console.log("error",error);

      }
    })
    this.getCategoryData()
  }
  get formControls() { return this.Cat_Form.controls; }

  get name() { return this.Cat_Form.get('name'); }

  getCategoryData(){
    this.authService.getAllCategory().subscribe({
      next:(res)=>{
        this.datas = res.allCategories;
      },
      error:(error)=>{
        console.log("error",error)
      }
    })
  }

  onSubmit() {
    if (!this.Cat_Form.valid) {
      this.submitted = true;
      return false;
    }else{
      // this.modelClose = true;
      console.log("this.Cat_Form.value",this.Cat_Form.value)
      this.authService.addCategory(this.Cat_Form.value).subscribe({
        next:(res)=>{
          this.toastrService.success(res.massage)
          window.location.reload();
        },
        error:(error)=>{
          console.log("error",error)
          this.toastrService.danger(error.error.massage)
        }
      })
    }
    }

    deletecat(_id:any){
      this.authService.deleteCategory(_id).subscribe({
        next:(res)=>{
          this.toastrService.success(res.massage)
          window.location.reload();
          console.log("res",res)
        },
        error:(error)=>{
          console.log("error",error)
          this.toastrService.danger(error.error.massage)
        }
      })
      console.log("id",_id)
    }

    editData(_id:any){
      this.id = _id
      this.authService.getOneCategory(_id).subscribe({
        next:(res)=>{
          this.CatEditForm.get('ename').patchValue(res.findCategories.name)
        },
        error:(error)=>{
          console.log("error",error)
        }
      })
    }
    Editcat(){
      this.authService.updateCategory(this.id,this.CatEditForm.value).subscribe({
        next:(res)=>{
          this.toastrService.success(res.message)
          window.location.reload();
          console.log("res",res)
        },
        error:(error)=>{
          console.log("error",error)
          this.toastrService.danger(error.error.massage)
        }
      })
    }
}
