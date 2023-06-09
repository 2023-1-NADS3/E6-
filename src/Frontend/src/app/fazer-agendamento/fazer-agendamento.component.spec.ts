import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FazerAgendamentoComponent } from './fazer-agendamento.component';

describe('FazerAgendamentoComponent', () => {
  let component: FazerAgendamentoComponent;
  let fixture: ComponentFixture<FazerAgendamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FazerAgendamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FazerAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
