import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlerteActuelleComponent } from './alerte-actuelle.component';

describe('AlerteActuelleComponent', () => {
  let component: AlerteActuelleComponent;
  let fixture: ComponentFixture<AlerteActuelleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlerteActuelleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlerteActuelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
