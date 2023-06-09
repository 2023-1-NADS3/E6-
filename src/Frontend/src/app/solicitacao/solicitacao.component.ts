
  import { getLocaleExtraDayPeriods } from '@angular/common';
import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
  import { slideAnimation, slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css'],
  animations: [slideAnimation, slideToSide]
})
export class SolicitacaoComponent {

  public weekdays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
  public order_id: string = ''

  public order: any | null;
  public ong_owner: any;

  public user: any = {}
  public my_donation = [0, 0, 0, 0, 0, 0, 0]
  public is_open = 0;
  public is_appointed = 0;
  public is_owner = 0;

  public marking_appointment = 0;

  public possible_items = ['Farinhas e Amidos', 'Conservas', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']


  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService){}
  

  public appointed_mentioned_to_this_order: any;
  async ngOnInit(): Promise<void> {  
    this.order_id = this.route.snapshot.paramMap.get('order_id') || '';    
    if (!this.order_id) this.router.navigateByUrl('/perfil');

    await this.getUserInfo()
    await this.getOrder()
    console.log(this.ong_owner)
    if (this.user.type === 'user') {
      await this.getMyAppointments()
      this.my_appointments?.forEach((appointment: any) => {
        if (appointment?.order_parent_id == this.order_id && !appointment.confirmed) { 
          this.is_appointed = 1;
          this.appointed_mentioned_to_this_order = appointment;
          console.log(this.appointed_mentioned_to_this_order)
        }
      })
    } else if (this.user.type === 'ong') {
      if (this.order?.order?.owner === this.user?.id ) this.is_owner = 1
    } else {
      this.router.navigateByUrl('/perfil');
    }
    
  }

  createComponent() {
    const produto = document.getElementById('prod');
    let cloneProduto = produto?.cloneNode(true);
    document.getElementById('produtos')?.appendChild(cloneProduto as Node);
  }

  async getUserInfo() {
    this.user = await this.authService.getUserFromStorage()
  }

  ChangeInputDonation(value: any, i: number) {
    this.my_donation[i] = value;
    console.log(this.my_donation)
  }

  async desmarcar(appointment_id: string) {
    const res = await fetch(`http://localhost:3000/delete/myappointment?appointment_id=${appointment_id}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      this.my_appointments = this.my_appointments.filter(appointment => appointment._id !== appointment_id)
    } else {
      console.log(await res.text())
    }
  }


  public my_appointments: any[] = [];
  public my_appointments_count: number = 0;
  public my_not_viewd_donations_count: number = 0;
  async getMyAppointments() {
    const res = await fetch(`http://localhost:3000/myappointments`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data)
      this.my_appointments = data;
    }
  }

  async makeAppointment() {
    console.log(this.my_donation)
    console.log(this.my_donation.length)
    const res = await fetch(`http://localhost:3000/makeappointment`, {
      body: JSON.stringify({
        order_parent_id: this.order_id,
        day: 'ter',
        items: this.my_donation
      }),
      credentials: 'include',
      method: 'POST',
    });
    if (res.status === 200) {
      console.log('ok')
    } else {
      console.log(await res.text())
    }
  }

  async getOrder() {
    const res = await fetch(`http://localhost:3000/getorderandtime?order_id=${this.order_id}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json()
      if (data) {
        this.order = data.order;
        console.log(this.order)
        this.ong_owner = data.owner;
      }
    } else {
      console.log(await res.text())
    }
  }

  goToOngPage(ong_id: string) {
    this.router.navigateByUrl(`/ong/${ong_id}`)
  }

}
