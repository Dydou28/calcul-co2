import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumeriqueComponent } from './numerique.component';

describe('NumeriqueComponent', () => {
  let component: NumeriqueComponent;
  let fixture: ComponentFixture<NumeriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumeriqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumeriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
