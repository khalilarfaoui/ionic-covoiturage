import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoxPage } from './box.page';

describe('BoxPage', () => {
  let component: BoxPage;
  let fixture: ComponentFixture<BoxPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
