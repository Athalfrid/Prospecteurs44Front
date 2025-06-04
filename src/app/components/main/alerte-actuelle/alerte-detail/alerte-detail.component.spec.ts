import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteDetailComponent } from './alerte-detail.component';

describe('AlerteDetailComponent', () => {
  let component: AlerteDetailComponent;
  let fixture: ComponentFixture<AlerteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlerteDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlerteDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
