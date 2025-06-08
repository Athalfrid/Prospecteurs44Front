import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicMessagesComponent } from './topic-messages.component';

describe('TopicMessagesComponent', () => {
  let component: TopicMessagesComponent;
  let fixture: ComponentFixture<TopicMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
