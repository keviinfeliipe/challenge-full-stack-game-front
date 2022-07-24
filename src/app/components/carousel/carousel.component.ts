import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from 'src/app/interfaces/card';
import { CardCarousel } from 'src/app/interfaces/card-carousel';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  cards: Array<Card> = [];
  cardsCarousel: Array<CardCarousel> =[];

  constructor(private dataService: DataService, private router: Router) { }

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
          title: res.nombre
        }

        this.cardsCarousel.push(card);
      })
    });

    console.log(this.cardsCarousel);
    
  }

}
