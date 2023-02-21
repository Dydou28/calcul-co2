import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculetteEntityComponent } from './calculette-entity.component';

describe('CalculetteEntityComponent', () => {
  let component: CalculetteEntityComponent;
  let fixture: ComponentFixture<CalculetteEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculetteEntityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculetteEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
