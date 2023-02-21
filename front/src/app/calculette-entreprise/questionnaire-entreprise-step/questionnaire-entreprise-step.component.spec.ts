import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireEntrepriseStepComponent } from './questionnaire-entreprise-step.component';

describe('QuestionnaireEntrepriseStepComponent', () => {
  let component: QuestionnaireEntrepriseStepComponent;
  let fixture: ComponentFixture<QuestionnaireEntrepriseStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireEntrepriseStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireEntrepriseStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
