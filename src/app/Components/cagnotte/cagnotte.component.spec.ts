import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CagnotteComponent } from './cagnotte.component';

describe('CagnotteComponent', () => {
  let component: CagnotteComponent;
  let fixture: ComponentFixture<CagnotteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CagnotteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CagnotteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
