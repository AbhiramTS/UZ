import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewstreamComponent } from './newstream.component';

describe('NewstreamComponent', () => {
  let component: NewstreamComponent;
  let fixture: ComponentFixture<NewstreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewstreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewstreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
