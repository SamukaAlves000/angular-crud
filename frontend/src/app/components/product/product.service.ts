import { Product } from './product.model';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"
  constructor(private snackBar: MatSnackBar,private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false):void{
      this.snackBar.open(msg,'X',
      {
        duration:3000,
        horizontalPosition:"right",
        verticalPosition: "top",
        panelClass: isError ? ['msg-error'] : ['msg-sucess']
      }
      )
  }

  create(produtc:Product):Observable<Product>{
    return this.http.post<Product>(this.baseUrl,produtc).pipe(
      map((obj) => obj),
      catchError((e) =>this.errorHandler(e))
    );
  }

  read(): Observable<Product []> {
   return this.http.get<Product []>(this.baseUrl)
  }

  readById(id:string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Product>(url)
   }

   update(produtc:Product):Observable<Product>{
    const url = `${this.baseUrl}/${produtc.id}`
    return this.http.put<Product>(url,produtc).pipe(
      map((obj) => obj),
      catchError((e) =>this.errorHandler(e))
    );
  }

  delete(id:number):Observable<Product>{
    const url = `${this.baseUrl}/${id}`
    return this.http.delete<Product>(url).pipe(
      map((obj) => obj),
      catchError((e) =>this.errorHandler(e))
    );
  }

  errorHandler(e:any) : Observable<any>{
    this.showMessage('Ocorreu um erro!',true)
    return EMPTY
  }
}
