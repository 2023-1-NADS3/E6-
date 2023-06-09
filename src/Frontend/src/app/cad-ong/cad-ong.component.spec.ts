import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadONGComponent } from './cad-ong.component';

describe('CadONGComponent', () => {
  let component: CadONGComponent;
  let fixture: ComponentFixture<CadONGComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadONGComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadONGComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
