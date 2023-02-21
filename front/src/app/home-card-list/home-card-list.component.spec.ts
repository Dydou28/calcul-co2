import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCardListComponent } from './home-card-list.component';

describe('HomeCardListComponent', () => {
  let component: HomeCardListComponent;
  let fixture: ComponentFixture<HomeCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
