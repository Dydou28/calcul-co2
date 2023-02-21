import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireEcoComponent } from './questionnaire-eco.component';

describe('QuestionnaireEcoComponent', () => {
  let component: QuestionnaireEcoComponent;
  let fixture: ComponentFixture<QuestionnaireEcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireEcoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireEcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
