import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertesosComponent } from './alertesos.component';

describe('AlertesosComponent', () => {
  let component: AlertesosComponent;
  let fixture: ComponentFixture<AlertesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertesosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlertesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
