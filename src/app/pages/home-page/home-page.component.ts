import { Component, OnInit } from '@angular/core';
import { MealService } from '../../Services/meal.service';
import Meal from '../../models/meal.model';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  datasMeal: Meal[] = [];
  constructor(private MealService: MealService) {}
  private date = new Date();

  ngOnInit(): void {
    this.MealService.getMeals().subscribe((datasMeal) => {
      this.datasMeal = datasMeal;
    });
    console.log(this.datasMeal, this.date);
  }
}
