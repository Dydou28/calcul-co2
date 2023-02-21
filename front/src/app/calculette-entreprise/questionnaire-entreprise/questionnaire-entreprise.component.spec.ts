import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireEntrepriseComponent } from './questionnaire-entreprise.component';

describe('QuestionnaireEntrepriseComponent', () => {
  let component: QuestionnaireEntrepriseComponent;
  let fixture: ComponentFixture<QuestionnaireEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireEntrepriseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
