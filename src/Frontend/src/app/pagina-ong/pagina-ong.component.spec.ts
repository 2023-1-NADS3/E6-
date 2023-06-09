import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaOngComponent } from './pagina-ong.component';

describe('PaginaOngComponent', () => {
  let component: PaginaOngComponent;
  let fixture: ComponentFixture<PaginaOngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaOngComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaOngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
