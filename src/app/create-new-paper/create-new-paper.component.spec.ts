import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewPaperComponent } from './create-new-paper.component';

describe('CreateNewPaperComponent', () => {
  let component: CreateNewPaperComponent;
  let fixture: ComponentFixture<CreateNewPaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewPaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
