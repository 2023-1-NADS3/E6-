import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-agendamentosdaminhaorder',
  templateUrl: './agendamentosdaminhaorder.component.html',
  styleUrls: ['./agendamentosdaminhaorder.component.css'],
  animations: [slideToSide]
})
export class AgendamentosdaminhaorderComponent {


  public weekdays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
  public order_id: string = ''
  public order: any | null;
  public user: any = {}
  public my_donation = [0, 0, 0, 0, 0, 0, 0]
  
  public possible_items = ['Farinhas e Amidos', 'Conservas', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']
  

  public appointments: any = []
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService){}
  
  async ngOnInit(): Promise<void> {
    await this.getUserInfo()
    this.order_id = this.route.snapshot.paramMap.get('order_id') || '';    
    if (!this.order_id || this.user.type !== 'ong') this.router.navigateByUrl('/perfil');
    // await this.getOrder()
    await this.getAppointmentsFromMyOrder()
    console.log(this.appointments)
    this.filterArray()
  }

  public search_text: string = ''
  public filtered_appointments: any[] = []
  filterArray() {
    if (this.search_text) {
      this.filtered_appointments = this.appointments.filter((item: any) =>
        item?._id.toLowerCase().includes(this.search_text.toLowerCase())
      );
    } else {
      this.filtered_appointments = this.appointments
    }
  }

  async confirmDonation(appointment_id: string) {
    appointment_id
     const res = await fetch(`http://localhost:3000/confirmdonation?appointment_id=${appointment_id}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      alert('ok')
    } else {
      console.log(await res.text())
    }
  }

  async getAppointmentsFromMyOrder() {
    const res = await fetch(`http://localhost:3000/getAppointmentsFromMyOrder?order_id=${this.order_id}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      this.appointments = await res.json()
    } else {
      console.log(await res.text())
    }
  }
  

  async getUserInfo() {
    this.user = await this.authService.getUserFromStorage()
  }

  ChangeInputDonation(value: any, i: number) {
    this.my_donation[i] = value;
    console.log(this.my_donation)
  }

  async makeAppointment() {
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
        this.order = data;
      }
    } else {
      console.log(await res.text())
    }
  }

  goTo(url: string){
    this.router.navigateByUrl(`/${url}`)
  }
  
}
