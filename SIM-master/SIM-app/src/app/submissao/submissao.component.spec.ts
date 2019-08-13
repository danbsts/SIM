import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissaoComponent } from './submissao.component';

describe('SubmissaoComponent', () => {
  let component: SubmissaoComponent;
  let fixture: ComponentFixture<SubmissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
