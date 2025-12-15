import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBillingComponent } from './view-billing.component';

describe('ViewBillingComponent', () => {
  let component: ViewBillingComponent;
  let fixture: ComponentFixture<ViewBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBillingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
