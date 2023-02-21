import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculettePersoComponent } from './calculette-perso.component';

describe('CalculettePersoComponent', () => {
  let component: CalculettePersoComponent;
  let fixture: ComponentFixture<CalculettePersoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculettePersoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculettePersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
