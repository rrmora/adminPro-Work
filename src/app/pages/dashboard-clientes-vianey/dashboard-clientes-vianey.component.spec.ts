import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardClientesVianeyComponent } from './dashboard-clientes-vianey.component';

describe('DashboardClientesVianeyComponent', () => {
  let component: DashboardClientesVianeyComponent;
  let fixture: ComponentFixture<DashboardClientesVianeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardClientesVianeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardClientesVianeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
