import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadeComponent } from './disponibilidade.component';

describe('DisponibilidadeComponent', () => {
  let component: DisponibilidadeComponent;
  let fixture: ComponentFixture<DisponibilidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisponibilidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
