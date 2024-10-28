import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemDatailsPage } from './item-datails.page';

describe('ItemDatailsPage', () => {
  let component: ItemDatailsPage;
  let fixture: ComponentFixture<ItemDatailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDatailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
