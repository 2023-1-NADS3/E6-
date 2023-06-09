import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAlimentoComponent } from './add-alimento.component';

describe('AddAlimentoComponent', () => {
  let component: AddAlimentoComponent;
  let fixture: ComponentFixture<AddAlimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAlimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAlimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
