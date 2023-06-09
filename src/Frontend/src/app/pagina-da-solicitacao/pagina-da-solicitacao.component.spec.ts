import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDaSolicitacaoComponent } from './pagina-da-solicitacao.component';

describe('PaginaDaSolicitacaoComponent', () => {
  let component: PaginaDaSolicitacaoComponent;
  let fixture: ComponentFixture<PaginaDaSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaDaSolicitacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaDaSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
