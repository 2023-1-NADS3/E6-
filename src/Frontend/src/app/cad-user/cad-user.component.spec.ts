import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadUserComponent } from './cad-user.component';

describe('CadUserComponent', () => {
  let component: CadUserComponent;
  let fixture: ComponentFixture<CadUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
