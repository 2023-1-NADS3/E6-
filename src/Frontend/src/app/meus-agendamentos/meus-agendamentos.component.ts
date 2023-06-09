import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meus-agendamentos',
  templateUrl: './meus-agendamentos.component.html',
  styleUrls: ['./meus-agendamentos.component.css']
})
export class MeusAgendamentosComponent {


  constructor(private router: Router){}
  public my_appointments: any[] = [];

  public possible_items = ['Farinhas e Amidos', 'Conservas', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']

  
  async ngOnInit() {
    await this.getMyAppointments()
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
      this.my_appointments?.forEach(item => { 
        if (!item.confirmed) this.my_appointments_count++
        if (item?.confirmed && !item?.viewed) this.my_not_viewd_donations_count++
      })
    }
  }


  goToOrderPage(order_id: string) {
    this.router.navigateByUrl(`/solicitacao/${order_id}`)
  }

  goTo(url: string){
    this.router.navigateByUrl(`/${url}`)
  }

}
