import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/interfaces/card';
import { CardCarousel } from 'src/app/interfaces/card-carousel';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  cards: Array<Card> = [];
  cardsCarousel: Array<CardCarousel> =[];
  displayPosition: boolean = false;
  position: string ='';
  responsiveOptions;

  constructor(private dataService: DataService, private router: Router) { 
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.generateImages();
    this.dataService.connectToWebSocket("15").subscribe((x: any) => {
      console.log(x);});
  }

  generateImages() {
    this.dataService.getCards().subscribe(x => {
      console.log('resultado', x);

      x.forEach( res => {
        let card: CardCarousel;
        card = {
          id: res.id,
          image: res.imagen,
          thumbImage: res.imagen,
          title: res.nombre,
          caracteristica: res.caracteristica,
          poder: res.poder,
          descipcion: res.descipcion
        }

        this.cardsCarousel.push(card);
      })
    });

    console.log(this.cardsCarousel);
    
  }

  goToSignIn(){
    this.router.navigate(['sign-in']);
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
  sala() {
    this.router.navigate(['sign-in']);
  }

}
