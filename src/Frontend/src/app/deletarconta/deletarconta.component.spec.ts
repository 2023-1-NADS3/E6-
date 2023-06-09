import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarcontaComponent } from './deletarconta.component';

describe('DeletarcontaComponent', () => {
  let component: DeletarcontaComponent;
  let fixture: ComponentFixture<DeletarcontaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletarcontaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletarcontaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
