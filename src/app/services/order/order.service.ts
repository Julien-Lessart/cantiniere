import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configBack } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _http:HttpClient) { }
  private _config = new configBack; 
  private _findAllForUserOrderQuery = `${this._config.protocol}://${this._config.domain}:${this._config.port}/${this._config.context}/order/findallforuser`;
  private _addOrderQuery = `${this._config.protocol}://${this._config.domain}:${this._config.port}/${this._config.context}/order/add`;
  private _cancelOrderQuery = `${this._config.protocol}://${this._config.domain}:${this._config.port}/${this._config.context}/order/cancel`;


  getAllOrderForUser(userId:number):Observable<order[]>{
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', localStorage.getItem('id_token') || "");
    const requestOptions = {headers: headers}; 
    return this._http.get<order[]>(this._findAllForUserOrderQuery + `/${userId}`,
    requestOptions);
  }

  addOrder(userId:number, data:{ quantity:number, mealId:number, menuId:number }){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', localStorage.getItem('id_token') || "");
    const requestOptions = { 
      headers: headers, 
    }; 
    const body = {
      userId:userId,
      constraintId:-1,
      quantity:[
        {
          quantity:data.quantity,
          mealId:data.mealId,
          menuId:data.menuId
        }
      ]
    }
    return this._http.put<any>(this._addOrderQuery, body, requestOptions);
  }
  cancelOrder(userId:number){
    const headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', localStorage.getItem('id_token') || "");
    const requestOptions = { 
      headers: headers, 
    }; 
    console.log(this._cancelOrderQuery + `/${userId}`);
    return this._http.patch<any>(this._cancelOrderQuery + `/${userId}`,null, requestOptions);
  }
}


export interface order{
  creationDate:string; 
  creationTime:string; 
  id:number;
  quantity: [quantity];
  status:string;
  user:user;
}

export interface user{
    address:string;
    email:string; 
    firstname:string; 
    id:number; 
    imageId:number; 
    isLunchLady:boolean; 
    name:string; 
    postalCode:string; 
    registrationDate:string; 
    sex:string; 
    status:string; 
    town:string; 
    wallet:number; 
}

export interface quantity{
    id:number,
    meal: {
      availableForWeeksAndDays: {
        values: [valuesDate];
      }      
      category:string; 
      id:number; 
      imageId:number; 
      ingredients: [ingredients];
      label:string; 
      priceDF:number;
      status:string; 
      quantity:number;
    }
}
export interface ingredients{
    id:number,
    imageId:number,
    label:string,
    status:string
}

export interface valuesDate {
    day:number; 
    week:number; 
}