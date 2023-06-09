import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoUsuarioComponent } from './tipo-usuario.component';

describe('TipoUsuarioComponent', () => {
  let component: TipoUsuarioComponent;
  let fixture: ComponentFixture<TipoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
