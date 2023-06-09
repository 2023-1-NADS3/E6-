import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { slideAnimation, slideToSide } from '../slideAnimation';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  animations: [slideAnimation, slideToSide]
})
export class OrdersComponent implements OnInit {


  @ViewChild('container') container!: ElementRef;

  public possible_items = ['Farinhas e Amidos', 'Conservas', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']
  
  public orders: any[] = []
  public order: any = null // opened ong info
  // public my_likes: any[] = []
  public current_pack: number = 1
  public is_over: number = 0
  public is_open: number = 0

  public is_on_order_screen = 0;

  constructor(private router: Router, private authService: AuthService) {
    
  }
  public user: any;

  async ngOnInit() {
    await this.getFiveOrdersData()
    await this.getUserInfo()
    this.addEventListeners()
    if (this.user.type === 'user') {
          await this.getMyAppointments()
     }
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

  public is_appointed = 0;
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


  // async ngOnInit(): Promise<void> {  
  //   this.order_id = this.route.snapshot.paramMap.get('order_id') || '';    
  //   if (!this.order_id) this.router.navigateByUrl('/perfil');

  //   await this.getUserInfo()
  //   await this.getOrder()
  //   console.log(this.ong_owner)
  //   if (this.user.type === 'user') {
  //     await this.getMyAppointments()
  //     this.my_appointments?.forEach((appointment: any) => {
  //       if (appointment?.order_parent_id == this.order_id && !appointment.confirmed) { 
  //         this.is_appointed = 1;
  //         this.appointed_mentioned_to_this_order = appointment;
  //         console.log(this.appointed_mentioned_to_this_order)
  //       }
  //     })
  //   } else if (this.user.type === 'ong') {
  //     if (this.order?.order?.owner === this.user?.id ) this.is_owner = 1
  //   } else {
  //     this.router.navigateByUrl('/perfil');
  //   }
    
  // }
  async getUserInfo() {
    this.user = await this.authService.getUserFromStorage()
  }

  makeAppointment(order_id: string) {
    window.location.href = `/solicitacao/${order_id}`
  }

  async openOrder(i: number) {
    this.is_on_order_screen = 1
    
    this.order = this.orders[i]
    // this.order.orders = [];
    this.order.loading_orders = 1;
    // const res = await fetch(`http://localhost:3000/getordersfrom?ong_id=${this.orders[i]._id}`, {
    //   credentials: 'include',
    //   method: 'GET',
    // })
    // const data = await res.json()
    // console.log(data)
    // this.order.orders = data;
    this.order.loading_orders = 0;
  }

  goToOngPage(ong_id: string) {
    this.router.navigateByUrl(`/ong/${ong_id}`)
  }

  closeOrder() {
    this.is_on_order_screen = 0
    this.order = null;
  }

  private lastScrollPosition: number = 0;
  private recently_fired: number = 0;
  addEventListeners() {
    this.container.nativeElement.addEventListener('scroll', async (event: Event) => {
      const el = event.target as HTMLElement;
      const currentScrollPosition = this.container.nativeElement.scrollTop;

      this.lastScrollPosition = currentScrollPosition;
      if ((el.scrollHeight - el.scrollTop) <= (el.clientHeight + 150)) {
        if (this.recently_fired === 0) {
          this.recently_fired = 1;
          await this.getFiveOrdersData()
          this.recently_fired = 0;
        }
      }
      
     })
  }

  async getFiveOrdersData() {
    if (this.is_over === 1) return;
    const res = await fetch(`http://localhost:3000/gettenorders?pack=${this.current_pack}`, {
      credentials: 'include',
      method: 'GET',
    })
    const data = await res.json()
    if (res.status === 200) { 
      if (data.data) {
        
        for (let i = 0; i < data.data?.length; i++) {
          data.data[i].sum_items = 0 
          data.data[i].sum_donated = 0 
          for (let j = 0; j < data.data[i].items?.length; j++) {
            data.data[i].sum_items += data.data[i].items[j]
            data.data[i].sum_donated += data.data[i].donated[j]
          }
        }
        this.orders.push(...data.data)
        this.current_pack++;
        console.log(this.orders)
      } else {
        this.is_over = 1;
      }
    }
  }

  async likeOng(ong_id: string, index: number){
   
  }
  
  async unlikeOng(ong_id: string, index: number){
 
  }

  async getMyLikes() {
  
  }

  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }
}
