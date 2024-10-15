import { Component, ViewChild } from '@angular/core';
import { ProductQuickviewComponent } from '../components/product-quickview/product-quickview.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('quickview') quickview!: ProductQuickviewComponent;

  constructor() {}

}
