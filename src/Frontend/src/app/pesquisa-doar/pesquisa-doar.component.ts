import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { slideAnimation, slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-pesquisa-doar',
  templateUrl: './pesquisa-doar.component.html',
  styleUrls: ['./pesquisa-doar.component.css'],
  animations: [slideAnimation, slideToSide]
})
export class PesquisaDoarComponent implements OnInit {

  @ViewChild('container') container!: ElementRef;
  
  public ongs: any[] = []
  public ong: any = null // opened ong info
  public my_likes: any[] = []
  public current_pack: number = 1
  public is_over: number = 0
  public ong_active_orders: any;

  public is_on_ong_screen = 0;

  constructor(private router: Router) {
    
  }


  async ngOnInit(){
    await this.getMyLikes()
    await this.getFiveOngsData()
    this.addEventListeners()
  }

  makeAppointment(order_id: string) {
    window.location.href = `/solicitacao/${order_id}`
  }

  goToOrderPage(order_id: string) {
    this.router.navigateByUrl(`/solicitacao/${order_id}`)
  }

  async openOng(i: number) {
    this.is_on_ong_screen = 1
    this.ong = this.ongs[i]
    this.ong.orders = [];
    this.ong.loading_orders = 1;
    const res = await fetch(`http://localhost:3000/getactiveordersfrom?ong_id=${this.ongs[i]._id}`, {
      credentials: 'include',
      method: 'GET',
    })
    const data = await res.json()
    console.log(data)
    this.ong_active_orders = data;
    this.ong.loading_orders = 0;
  }


  closeOng() {
    this.is_on_ong_screen = 0
    this.ong = null;
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
          await this.getFiveOngsData()
          this.recently_fired = 0;
        }
      }
      
     })
  }

  async getFiveOngsData() {
    if (this.is_over === 1) return;
    const res = await fetch(`http://localhost:3000/gettenongs?pack=${this.current_pack}`, {
      credentials: 'include',
      method: 'GET',
    })
    const data = await res.json()
    if (res.status === 200) { 
      if (data.data){
        console.log(data)
        for(let i = 0; i < data?.data?.length; i++){
          const idExistsInMyLikes = this.my_likes.some(like => like?.ong_id === data.data[i]._id);
          if (idExistsInMyLikes){
            data.data[i].liked = true;
          }
          data.data[i].likes = data.likes[`${data.data[i]._id}`] || 0
          this.ongs.push(data.data[i])
        }
        console.log(this.ongs)
        this.current_pack++;
      } else {
        this.is_over = 1;
      }
    }
  }

  public weekdays = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']
  public possible_items = ['Farinhas e Amidos', 'Conservas', 'Óleos e Gorduras', 'Leites e Derivados', 'Sucos e Bebidas', 'Grãos e Cereais', 'Enlatados']

  async likeOng(ong_id: string, index: number){
    const res = await fetch(`http://localhost:3000/like?ong_id=${ong_id}`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200){
      this.ongs[index].liked = true;
      this.ongs[index].likes++;
    }
  }
  
  async unlikeOng(ong_id: string, index: number){
    const res = await fetch(`http://localhost:3000/unlike?ong_id=${ong_id}`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200){
      this.ongs[index].liked = false;
      this.ongs[index].likes--;
    }
  }

  async getMyLikes() {
    const res = await fetch(`http://localhost:3000/mylikes`, {
      credentials: 'include',
      method: 'GET',
    })
    const data = await res.json()
    if (data && res.status === 200){
      this.my_likes = data;
    }
  }

  navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

}
