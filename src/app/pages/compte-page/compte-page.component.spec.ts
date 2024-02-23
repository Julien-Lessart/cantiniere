import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptePageComponent } from './compte-page.component';

describe('ComptePageComponent', () => {
  let component: ComptePageComponent;
  let fixture: ComponentFixture<ComptePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComptePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComptePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
