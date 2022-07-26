import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Card } from '../interfaces/card';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  //agregar sets

  sendPlayers(gameData: any) {
    return this.http.post<any>('http://localhost:8081/crearJuego', gameData);
  }

  startGame(id: string) {
    const gameId = { "juegoId": id };
    return this.http.post<any>('http://localhost:8081/iniciarJuego', gameId);
  } //https://cargames.herokuapp.com

  getCards(){
    return this.http.get<Card[]>('http://localhost:8081/api/v1/carta');
   // return this.http.get<Card[]>('/api/v1/carta'); 
  }

  connectToWebSocket(juegoId: string) {
    const webSocketSubject: WebSocketSubject<string> = webSocket(`ws://localhost:8081/retrieve/${juegoId}`);
    return webSocketSubject.asObservable();
  }
}
