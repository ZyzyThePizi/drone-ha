import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DronesComponent } from './drones.component';

describe('DronesComponent', () => {
  let component: DronesComponent;
  let fixture: ComponentFixture<DronesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DronesComponent]
    });
    fixture = TestBed.createComponent(DronesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
