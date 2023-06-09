import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasSolicitacoesComponent } from './minhas-solicitacoes.component';

describe('MinhasSolicitacoesComponent', () => {
  let component: MinhasSolicitacoesComponent;
  let fixture: ComponentFixture<MinhasSolicitacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhasSolicitacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasSolicitacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
