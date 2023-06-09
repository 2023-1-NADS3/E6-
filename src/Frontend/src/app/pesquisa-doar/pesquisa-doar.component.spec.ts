import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaDoarComponent } from './pesquisa-doar.component';

describe('PesquisaDoarComponent', () => {
  let component: PesquisaDoarComponent;
  let fixture: ComponentFixture<PesquisaDoarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisaDoarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesquisaDoarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
