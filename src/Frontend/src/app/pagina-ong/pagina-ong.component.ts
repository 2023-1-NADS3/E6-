import {  Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../auth.service';

import {ongs} from '../ongs';
import { slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-pagina-ong',
  templateUrl: './pagina-ong.component.html',
  styleUrls: ['./pagina-ong.component.css'],
  animations: [slideToSide]
})
export class PaginaOngComponent implements OnInit{

  public user: any;
  percentage = 12;
  public ong: any;
  public ong_active_orders: any;
  public ong_id: string = '';
  public is_user_owner: boolean = false;
  // public ong = {
  //   address_number: "1092",
  //   address_state: 'SP',
  //   address_street: "Praca da Lisboa",
  //   cpnj: "62480044264410",
  //   created_at: "22/05/2023-14:34:01",
  //   description: "",
  //   email: "",
  //   liked: true,
  //   likes: 15,
  //   loading_orders: 0, //0 or 1
  //   name: "Minha Instituicao",
  //   phone: "11964992323",
  //   type: "ong",
  //   _id: "646ba7898d71eff242154d9f",
  //   working_time: { seg: '00:00-00:00', ter: '14:00-20:00', qua: '14:00-20:00', qui: '14:00-20:00', sex: '09:00-18:30', sab: '00:00-00:00' }
  // }

  public weekdays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
  public my_appointments: any = []
  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService){}
  
  async ngOnInit(): Promise<void> {
    this.ong_id = this.route.snapshot.paramMap.get('ong_id') || '';    
    if (!this.ong_id) this.router.navigateByUrl('/perfil');

    await this.getUserInfo()
    if (this.user.type === 'user') {
      await this.getMyAppointments()
    }

    await this.getOng()
    console.log(this.ong)
    await this.getOngOrders()
    this.isUserOwner()
  }

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


  public possible_items = ['Farinhas e Amidos', 'Conservas', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']
  
  async desmarcar(order_id: string) {
    const found = this.my_appointments.find((appointment: any) =>  appointment.order_parent_id === order_id )
    if (!found) return
    console.log(found)
    const res = await fetch(`http://localhost:3000/delete/myappointment?appointment_id=${found._id}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      this.my_appointments = this.my_appointments.filter((appointment: any) => appointment._id !== found._id)
    } else {
      console.log(await res.text())
    }
  }

  checkIfOrderIsAppointed(order_id: string): boolean {
    let exists = false;
    this.my_appointments?.forEach((appointment: any) => {
      if (appointment.order_parent_id === order_id) exists = true;
    })
    return exists;
  }

  isUserOwner() {
      this.is_user_owner =  this.user.id === this.ong_id
  }



  // async makeAppointment() {
  //   const res = await fetch(`http://localhost:3000/makeappointment`, {
  //     body: JSON.stringify({
  //       order_parent_id: this.order_id,
  //       day: 'ter',
  //       items: this.my_donation
  //     }),
  //     credentials: 'include',
  //     method: 'POST',
  //   });
  //   if (res.status === 200) {
  //     console.log('ok')
  //   } else {
  //     console.log(await res.text())
  //   }
  // }

  async getOng() {
    const res = await fetch(`http://localhost:3000/ongs?ong_id=${this.ong_id}`, {
      credentials: 'include',
      method: 'GET',
    });
    if (res.status === 200) {
      const data = await res.json()
      if (data) {
        this.ong = data;
      }
    }
  }

  async getOngOrders() {
    const res = await fetch(`http://localhost:3000/getactiveordersfrom?ong_id=${this.ong._id}`, {
      credentials: 'include',
    method: 'GET',
    })
    if (res.status === 200) {
      const data = await res.json();
      if (!data) return
      for (let i = 0; i < data?.length; i++) {
        data[i].sum_items = 0
        data[i].sum_donated = 0
        for (let j = 0; j < data[i].items?.length; j++) {
          data[i].sum_items += data[i].items[j]
          data[i].sum_donated += data[i].donated[j]
        }
      }
      this.ong_active_orders = data;
      console.log(this.ong_active_orders)
    }
}

goToOrderPage(order_id: string) {
  this.router.navigateByUrl(`/solicitacao/${order_id}`)
}

  async getUserInfo() {
    this.user = await this.authService.getUserFromStorage()
  }

  

  goToPage(pageName: String){
        this.router.navigate([`${pageName}`]);
  }
  
  makeAppointment(order_id: string) {
    window.location.href = `/solicitacao/${order_id}`
  }



}






// import {  AfterViewInit, Component } from '@angular/core';
// import { OnInit } from '@angular/core';
// import { HammerGestureConfig } from '@angular/platform-browser';
// import { ActivatedRoute, ParamMap } from '@angular/router';
// import { Router } from '@angular/router';
// import {ongs} from '../ongs';

// @Component({
//   selector: 'app-pagina-ong',
//   templateUrl: './pagina-ong.component.html',
//   styleUrls: ['./pagina-ong.component.css']
// })
// export class PaginaOngComponent implements AfterViewInit{
//   constructor(private route: ActivatedRoute, private router: Router) { }
//   percentage = 12;
//   ongs = ongs;
//   heart = { outline: "../../assets/heart-outline.png", full: "../../assets/heart-full.png"}
//   fav_src = this.heart.outline;
//   favved = false
//   goToPage(pageName:String){
//     this.router.navigate([`${pageName}`]);
//   }
//   updateFav(){
//     if (this.favved == false){
//       this.fav_src = this.heart.full;
//       this.favved = true;
//     }
//     else{
//       this.fav_src = this.heart.outline;
//       this.favved = false;
//     }
//   }
//   ngAfterViewInit() {
//     const myElement = document.getElementById("progress") as HTMLElement;
//     myElement.style.width = `${this.percentage}%`;
//   }  

//   // @ts-ignore: Object is possibly 'null'.
//   id: number;

//   ngOnInit(): void {
//     this.route.paramMap.subscribe((params: ParamMap) => {
//       // @ts-ignore: Object is possibly 'null'.
//       this.id = +params.get('id');
//     });
//   }

// }
