import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.component.html',
  styleUrls: ['./meus-dados.component.css'],
  animations: [slideToSide]
})
export class MeusDadosComponent implements OnInit {

  loading: number = 1;
  me: any;
  constructor(private router: Router) { }
  

  async ngOnInit() {
    await this.getMyData()
  }

  public address_state: string = '';

  async getMyData() {
    const res = await fetch(`http://localhost:3000/getMyInfo`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json()
      if (!data) return;
      this.me = data;
      console.log(this.me)
      this.address_state = this.me?.address_state;
      // this.me = await res.json()
    } else {
      // this.goTo('login')
      console.log(await res.text())
      
      console.log('no')
    }
  }

  async changeInfo() {
    
  }

  goTo(path: string) {
    this.router.navigateByUrl(`${path}`)
  }
}
