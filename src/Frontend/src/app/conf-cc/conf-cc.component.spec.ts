import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfCcComponent } from './conf-cc.component';

describe('ConfCcComponent', () => {
  let component: ConfCcComponent;
  let fixture: ComponentFixture<ConfCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfCcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
