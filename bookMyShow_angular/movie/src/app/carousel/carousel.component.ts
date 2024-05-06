import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  ngOnInit(): void {
      this.showSlides();
  }
  images: string[] = ["https://assets-in.bmscdn.com/promotions/cms/creatives/1706519986697_shanmukhaweb.jpg", "https://assets-in.bmscdn.com/promotions/cms/creatives/1706616052495_kidaweb.jpg", "https://assets-in.bmscdn.com/promotions/cms/creatives/1706185879689_grandgalaweb.jpg"];
  currentIndex: number = 0;

  showSlides() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000);
  }
  currentSlide(index: number) {
    this.currentIndex = index - 1;
  }

}
