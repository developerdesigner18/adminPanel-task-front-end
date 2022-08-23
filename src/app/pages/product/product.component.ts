import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  categories:any[]=[]
  productForm: FormGroup;
  submitted = false;
  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  modelClose: boolean = false;
  datas: any;
  id: any;
  constructor(private fb: FormBuilder,private toastrService: NbToastrService,
    public authService: AuthService,
    public router: Router,) {
      this.productForm = this.fb.group({
        name: [
         '', [Validators.required],
      ],
        price: [
         '', [Validators.required],
      ],
        category: [
         '', [Validators.required],
      ]
      });
    }
    ngOnInit(): void {
      this.authService.getAllCategory().subscribe({
        next:(res)=>{
          res.allCategories.map((i:any)=>{
            this.categories.push(i.name)
          })
        },
        error:(error)=>{
          console.log("error",error)
        }
      })
      this.getProductData();
    }
    get formControls() { return this.productForm.controls; }

    get categoryname() { return this.productForm.get('categoryname'); }
    getProductData(){
      this.authService.getAllProduct().subscribe({
        next:(res)=>{
          console.log("res",res);
          this.datas = res.allCategories;
        },
        error:(error)=>{
          console.log("error",error)
        }
      })
    }
    onSubmit() {
      if (!this.productForm.valid) {
        this.submitted = true;
        return false;
      }else{
        console.log("this.productForm.value",this.productForm.value);

        this.authService.addProduct(this.productForm.value).subscribe({
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
      deleteproduct(_id:any){
        this.authService.deleteProduct(_id).subscribe({
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
        this.authService.getOneProduct(_id).subscribe({
          next:(res)=>{
            this.productForm.patchValue(res.findCategories)
          },
          error:(error)=>{
            console.log("error",error)
          }
        })
      }
      EditProduct(){
        this.authService.updateProduct(this.id,this.productForm.value).subscribe({
          next:(res)=>{
            this.toastrService.success(res.message)
            window.location.reload();
          },
          error:(error)=>{
            console.log("error",error)
            this.toastrService.danger(error.error.massage)
          }
        })
      }
}
