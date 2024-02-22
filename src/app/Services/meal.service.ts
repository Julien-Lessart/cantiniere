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

  getTodayMeals(week: number, day: number): Observable<Meal[]> {
    return this.HttpClient.get<Meal[]>(
      `${this.apiUrl}/menu/findallavailableforweekandday/${week}/${day}`
    );
  }
}
