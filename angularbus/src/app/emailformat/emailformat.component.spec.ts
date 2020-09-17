import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailformatComponent } from './emailformat.component';

describe('EmailformatComponent', () => {
  let component: EmailformatComponent;
  let fixture: ComponentFixture<EmailformatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailformatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailformatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
