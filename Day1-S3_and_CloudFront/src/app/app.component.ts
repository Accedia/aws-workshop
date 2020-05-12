import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 's3-demo-app';

  items = [{
    name: 'Mask 1',
    price: 999,
    img: '../assets/images/1.jpg',
    rating: 4
  },
  {
    name: 'Mask 2',
    price: 12,
    img: '../assets/images/3.jpg',
    rating: 3
  },
  {
    name: 'Mask 3',
    price: 41,
    img: '../assets/images/4.jpg',
    rating: 5
  },
  {
    name: 'Mask 4',
    price: 31,
    img: '../assets/images/18.jpg',
    rating: 4
  },
  {
    name: 'Mask 5',
    price: 11,
    img: '../assets/images/23.jpg',
    rating: 1
  },
  {
    name: 'Mask 6',
    price: 6,
    img: '../assets/images/noimage.png',
    rating: 5
  },
  {
    name: 'Mask 7',
    price: 7,
    img: '../assets/images/noimage.png',
    rating: 5
  },
  {
    name: 'Mask 8',
    price: 17,
    img: '../assets/images/noimage.png',
    rating: 3
  },
  {
    name: 'Mask 9',
    price: 999,
    img: '../assets/images/noimage.png',
    rating: 4
  },
  {
    name: 'Mask 10',
    price: 12.50,
    img: '../assets/images/noimage.png',
    rating: 2
  }
];
}
