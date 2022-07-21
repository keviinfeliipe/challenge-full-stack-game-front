import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  //agregar sets

  sendPlayers(gameData: any) {
    return this.http.post<any>('http://localhost:8080/crearJuego', gameData);
  }

  startGame(id: string) {
    const gameId = { "juegoId": id };
    return this.http.post<any>('http://localhost:8080/iniciarJuego', gameId);
  } //https://cargames.herokuapp.com

  getCars(juegoId: string){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("juegoId",juegoId);
    return this.http.get(`http://localhost:8080/cartas/${juegoId}`);
  }

  connectToWebSocket(juegoId: string) {
    const webSocketSubject: WebSocketSubject<string> = webSocket(`ws://localhost:8080/retrieve/${juegoId}`);
    return webSocketSubject.asObservable();
  }
}
