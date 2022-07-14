import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteoT24Component } from './conteo-t24.component';

describe('ConteoT24Component', () => {
  let component: ConteoT24Component;
  let fixture: ComponentFixture<ConteoT24Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConteoT24Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConteoT24Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
