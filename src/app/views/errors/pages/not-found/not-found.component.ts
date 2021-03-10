import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  screenWidth: number;
  ifScreenWidth: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // set screenWidth on page load
    this.screenWidth = window.innerWidth;
    window.onresize = () => {
      // set screenWidth on screen size change
      this.screenWidth = window.innerWidth
    };
    this.calculateIfScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = event.target.innerWidth;
    this.calculateIfScreenWidth();
  }

  calculateIfScreenWidth() {
    this.screenWidth < 768 ? this.ifScreenWidth = true : this.ifScreenWidth = false;
  }

}
