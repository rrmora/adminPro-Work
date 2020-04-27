import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadEstatusComponent } from './head-estatus.component';

describe('HeadEstatusComponent', () => {
  let component: HeadEstatusComponent;
  let fixture: ComponentFixture<HeadEstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadEstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadEstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
