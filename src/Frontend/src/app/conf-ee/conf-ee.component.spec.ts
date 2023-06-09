import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfEeComponent } from './conf-ee.component';

describe('ConfEeComponent', () => {
  let component: ConfEeComponent;
  let fixture: ComponentFixture<ConfEeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfEeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfEeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
