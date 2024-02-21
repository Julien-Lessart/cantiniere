import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Meal from '../models/meal.model';
@Injectable({
  providedIn: 'root',
})
export class MealService {
  constructor(private HttpClient: HttpClient) {}
  private apiUrl = 'http://localhost:8080/stone.lunchtime';
  private week = new Date();

  getMeals(): Observable<Meal[]> {
    return this.HttpClient.get<Meal[]>(`${this.apiUrl}/meal/findall`);
  }
}
