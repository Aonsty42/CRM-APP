import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SseService {
  // eventSource: SSE;
  getEventSource(url: string): EventSource{
    return new EventSource(url);
  }


  constructor() { }
}
