import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinhasdoacoesComponent } from './minhasdoacoes.component';

describe('MinhasdoacoesComponent', () => {
  let component: MinhasdoacoesComponent;
  let fixture: ComponentFixture<MinhasdoacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinhasdoacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinhasdoacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
