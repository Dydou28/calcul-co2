import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculetteOthersComponent } from './calculette-others.component';

describe('CalculetteOthersComponent', () => {
  let component: CalculetteOthersComponent;
  let fixture: ComponentFixture<CalculetteOthersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculetteOthersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculetteOthersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
