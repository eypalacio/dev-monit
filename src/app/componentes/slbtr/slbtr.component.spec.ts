import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlbtrComponent } from './slbtr.component';

describe('SlbtrComponent', () => {
  let component: SlbtrComponent;
  let fixture: ComponentFixture<SlbtrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlbtrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlbtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
