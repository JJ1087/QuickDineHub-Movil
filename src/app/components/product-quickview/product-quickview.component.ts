import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-quickview',
  templateUrl: './product-quickview.component.html',
  styleUrls: ['./product-quickview.component.scss'],
})
export class ProductQuickviewComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

  isVisible = false;

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

}
