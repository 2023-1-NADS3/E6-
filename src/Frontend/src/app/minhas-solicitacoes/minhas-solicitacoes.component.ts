import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-minhas-solicitacoes',
  templateUrl: './minhas-solicitacoes.component.html',
  styleUrls: ['./minhas-solicitacoes.component.css']
})
export class MinhasSolicitacoesComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }
  
  public user: any;
  async ngOnInit(): Promise<void> {
    await this.getName()
    await this.getMyOrders();
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  public my_orders: any;
  async getMyOrders() {
    const res = await fetch(`http://localhost:3000/myorders`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json();
      if (!data) {
        console.log('no data')
      }
      for (let i = 0; i < data?.length; i++) {
        data[i].sum_items = 0 
        data[i].sum_donated = 0 
        for (let j = 0; j < data[i].items?.length; j++) {
          data[i].sum_items += data[i].items[j]
          data[i].sum_donated += data[i].donated[j]
        }
      }
      
      this.my_orders = data
      console.log(this.my_orders)
    }
  }

  async getName() {
    this.user = await this.authService.getUserFromStorage()
  }

  goToAppointmentsFromOrderPage(order_id: string) {
    this.router.navigateByUrl(`/agendamentosdaorder/${order_id}`)
  }
  

  goToOrderPage(order_id: string) {
    this.router.navigateByUrl(`/solicitacao/${order_id}`)
  }
}
