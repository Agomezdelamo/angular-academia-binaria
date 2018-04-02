import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubOperationComponent } from './sub-operation.component';

describe('SubOperationComponent', () => {
  let component: SubOperationComponent;
  let fixture: ComponentFixture<SubOperationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubOperationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
