import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MesConPage } from './mes-con.page';

describe('MesConPage', () => {
  let component: MesConPage;
  let fixture: ComponentFixture<MesConPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MesConPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
