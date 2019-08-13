import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrecaoComponent } from './correcao.component';

describe('CorrecaoComponent', () => {
  let component: CorrecaoComponent;
  let fixture: ComponentFixture<CorrecaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrecaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
