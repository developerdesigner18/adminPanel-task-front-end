import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../environments/environment';
// import { environment } from '../environments/environment.prod';
import { NbToastrService } from '@nebular/theme';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './@core/data/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private httpClient: HttpClient,
    public router: Router,
    private injector: Injector, private toastrService: NbToastrService) { }

    redirectUrl: string;

    signUp(data:any):Observable<any>{
      return this.httpClient.post(`${environment.apiUrl}/auth/signup`,data)
    }

    login(data:any):Observable<any>{
      return this.httpClient.post(`${environment.apiUrl}/auth/signin`,data)
    }

    addCategory(data:any):Observable<any>{
      return this.httpClient.post(`${environment.apiUrl}/category/addCategory`,data)
    }

    getAllCategory():Observable<any>{
      return this.httpClient.get(`${environment.apiUrl}/category/ShowAllCategory`)
    }

    deleteCategory(_id:any):Observable<any>{
      return this.httpClient.delete(`${environment.apiUrl}/category/deleteCategory/`+_id)
    }
    updateCategory(_id:any,data:any):Observable<any>{
      console.log("data",data)
      return this.httpClient.put(`${environment.apiUrl}/category/updateCategory/${_id}`,data)
    }
    getOneCategory(_id:any):Observable<any>{
      // const des = {id: _id}
      return this.httpClient.get(`${environment.apiUrl}/category/ShowFindOneCategory/${_id}`)
    }

    addProduct(data:any):Observable<any>{
      return this.httpClient.post(`${environment.apiUrl}/product/addProduct`,data)
    }

    getAllProduct():Observable<any>{
      return this.httpClient.get(`${environment.apiUrl}/product/ShowAllProduct`)
    }

    deleteProduct(_id:any):Observable<any>{
      return this.httpClient.delete(`${environment.apiUrl}/product/deleteProduct/`+_id)
    }


    getOneProduct(_id:any):Observable<any>{
      // const des = {id: _id}
      return this.httpClient.get(`${environment.apiUrl}/product/ShowFindOneProduct/${_id}`)
    }

    updateProduct(_id:any,data:any):Observable<any>{
      console.log("data",data)
      return this.httpClient.put(`${environment.apiUrl}/product/updateProduct/${_id}`,data)
    }

    getProfileData(_id:any):Observable<any>{
      return this.httpClient.get(`${environment.apiUrl}/auth/getuser/${_id}`)
    }

    addUserLogin(data:any):Observable<any>{
      return this.httpClient.post(`${environment.apiUrl}/auth/AddUser`,data)
    }
}
