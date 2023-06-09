import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecupPasswordComponent } from './recup-password.component';

describe('RecupPasswordComponent', () => {
  let component: RecupPasswordComponent;
  let fixture: ComponentFixture<RecupPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecupPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecupPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
