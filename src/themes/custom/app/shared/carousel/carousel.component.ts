import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements AfterViewInit {

  @Input() title: string;
  @ViewChild('carouselGrid') carouselGrid: ElementRef;

  private scrollAmount = 300;

  constructor() { }

  ngAfterViewInit() {
    this.updateButtonState();
  }

  scrollLeft() {
    this.carouselGrid.nativeElement.scrollBy({ left: -this.scrollAmount, behavior: 'smooth' });
    this.updateButtonState();
  }

  scrollRight() {
    this.carouselGrid.nativeElement.scrollBy({ left: this.scrollAmount, behavior: 'smooth' });
    this.updateButtonState();
  }

  private updateButtonState() {
    setTimeout(() => {
      const { scrollLeft, scrollWidth, clientWidth } = this.carouselGrid.nativeElement;
      // You may need to adjust the logic here based on your specific needs
    }, 400); // Delay to allow smooth scrolling to finish
  }
}
