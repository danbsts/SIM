import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteracaoComponent } from './alteracao.component';

describe('AlteracaoDiaComponent', () => {
  let component: AlteracaoComponent;
  let fixture: ComponentFixture<AlteracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlteracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlteracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
