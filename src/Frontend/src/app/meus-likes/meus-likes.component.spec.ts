import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusLikesComponent } from './meus-likes.component';

describe('MeusLikesComponent', () => {
  let component: MeusLikesComponent;
  let fixture: ComponentFixture<MeusLikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeusLikesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
