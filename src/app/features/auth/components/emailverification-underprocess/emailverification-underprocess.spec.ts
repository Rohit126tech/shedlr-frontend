import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailverificationUnderprocess } from './emailverification-underprocess';

describe('EmailverificationUnderprocess', () => {
  let component: EmailverificationUnderprocess;
  let fixture: ComponentFixture<EmailverificationUnderprocess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailverificationUnderprocess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailverificationUnderprocess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
