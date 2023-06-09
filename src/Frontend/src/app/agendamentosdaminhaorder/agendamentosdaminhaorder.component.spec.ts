import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendamentosdaminhaorderComponent } from './agendamentosdaminhaorder.component';

describe('AgendamentosdaminhaorderComponent', () => {
  let component: AgendamentosdaminhaorderComponent;
  let fixture: ComponentFixture<AgendamentosdaminhaorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendamentosdaminhaorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendamentosdaminhaorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
