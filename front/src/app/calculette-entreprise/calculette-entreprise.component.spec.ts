import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculetteEntrepriseComponent } from './calculette-entreprise.component';

describe('CalculetteEntrepriseComponent', () => {
  let component: CalculetteEntrepriseComponent;
  let fixture: ComponentFixture<CalculetteEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculetteEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculetteEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
