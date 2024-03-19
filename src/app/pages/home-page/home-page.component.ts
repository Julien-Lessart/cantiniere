import { Component, OnInit } from '@angular/core';
import { MealService } from '../../services/meal/meal.service';
import Meal from '../../models/meal.model';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  datasMeal: Meal[] = [];
  constructor(private MealService: MealService) {}
  private currentDate: any = new Date();
  calculateWeek = () => {
    const startDate: any = new Date(this.currentDate.getFullYear(), 0, 1);
    let days = Math.floor(
      (this.currentDate - startDate) / (24 * 60 * 60 * 1000)
    );

    let weekNumber = Math.ceil(days / 7);
    return weekNumber;
  };

  private thisWeekNumber = this.calculateWeek();
  private thisdayNumber = this.currentDate.getDay();
  ngOnInit(): void {
    this.MealService.getTodayMeals(
      this.thisWeekNumber,
      this.thisdayNumber
    ).subscribe((datasMeal) => {
      this.datasMeal = datasMeal;
    });
    console.log({
      data: this.datasMeal,
      week: this.thisWeekNumber,
      day: this.thisdayNumber,
    });
  }
}
