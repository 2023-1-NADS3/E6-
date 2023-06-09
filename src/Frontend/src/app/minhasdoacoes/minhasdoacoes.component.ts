import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight} from '../slideAnimation'

@Component({
  selector: 'app-minhasdoacoes',
  templateUrl: './minhasdoacoes.component.html',
  styleUrls: ['./minhasdoacoes.component.css'],
  animations: [slideAnimation, slideToSide, fastSlideAnimation, slideToSideFromRight]
})
export class MinhasdoacoesComponent {


  public my_donations: any = []
  public not_viewd_donations: any = []
  public user: any;

  public possible_items = ['Farinhas e Amidos', 'Conservas', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']

  constructor(private router: Router, private authService: AuthService) { }
  
  async getUserInfo() {
    this.user = await this.authService.getUserFromStorage()
  }

  getNotVieweds() {
    this.not_viewd_donations = this.my_donations.filter((donation: any) => !donation.viewed)
  }

  async ngOnInit(): Promise<void> {

    await this.getUserInfo()
    if (this.user.type !== 'user') {
      this.router.navigateByUrl('/perfil')
    }
    await this.getMyDonations()
    this.getNotVieweds()
    console.log(this.my_donations)
    if (this.not_viewd_donations.length > 0) {
      await this.fireView()
    }
  }

  async gerarComprovante(appointment_id: string){
    const res = await fetch(`http://localhost:3000/generatePDF?appointment_id=${appointment_id.toString()}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      console.log(await res.text())
    }
  }

  async fireView() {
    const arr: any[] = []
    this.not_viewd_donations.forEach((item: any) => {
      arr.push(item._id)
    })
    const res = await fetch(`http://localhost:3000/viewDonations`, {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({ ids: arr })
    });
    if (res.status === 200) {
      console.log('ok')
    }
  }

  async getMyDonations() {
    const res = await fetch(`http://localhost:3000/getmydonations`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json();
      this.my_donations = data;
    }
  }
}
