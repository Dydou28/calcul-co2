import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatEntrepriseComponent } from './resultat-entreprise.component';

describe('ResultatEntrepriseComponent', () => {
  let component: ResultatEntrepriseComponent;
  let fixture: ComponentFixture<ResultatEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
