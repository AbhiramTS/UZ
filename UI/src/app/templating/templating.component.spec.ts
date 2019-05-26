import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatingComponent } from './templating.component';

describe('TemplatingComponent', () => {
  let component: TemplatingComponent;
  let fixture: ComponentFixture<TemplatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
