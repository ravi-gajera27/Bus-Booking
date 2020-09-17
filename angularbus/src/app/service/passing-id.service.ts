import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassingIdService {
  id:any;
  constructor() { }
  sendToService(id:any)
  {
    this.id=id;
  }
  sendToEdituser()
  {
    return this.id;
  }

}
