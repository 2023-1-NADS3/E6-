import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { slideToSide } from '../slideAnimation';

@Component({
  selector: 'app-fazer-agendamento',
  templateUrl: './fazer-agendamento.component.html',
  styleUrls: ['./fazer-agendamento.component.css'],
  animations: [slideToSide]
})
export class FazerAgendamentoComponent implements OnInit {
  public order_id: string = ''
  public times: any = {}
  public order: any = {}
  public closed = '00:00-00:00'
  public week_days = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']
  public item_names = ['item a', 'item b', 'item c', 'item d', 'item e', 'item f', 'item g']
  public inputData: any[] = [0,0,0,0,0,0,0];
  public selected: any | null = null;
  public input: string = '';

  constructor(private route: ActivatedRoute){}
  // appointment_id

  async ngOnInit() {
    this.order_id = this.route.snapshot.paramMap.get('order_id') || '';
    console.log(this.order_id)
    const res = await fetch(`http://localhost:3000/getorderandtime?order_id=${this.order_id}`, {
      credentials: 'include',
      method: 'GET',
    })
    if (res.status === 200) {
      const data = await res.json();
      this.times = data.time
      this.order = data.order
      console.log(data)
    }
  }

  async makeAppointment() {
    const res = await fetch(`http://localhost:3000/makeappointment`, {
      credentials: 'include',
      body: JSON.stringify({order_parent_id: this.order_id, items: this.inputData, day: 'ter'}),
      method: 'POST',
    })
    console.log(await res.text())
  }

  toggleSelection(i: number) {
    this.inputData[i] = this.inputData[i] ? null : 1;
  }

  preventDefault(e: Event) {
    e.stopPropagation();
  }

  inputDataChanged(i: number) {
    console.log(this.inputData[i])
    const missing = this.order.items[i] - this.order.donated[i];
    if (this.inputData[i] > missing) {
      this.inputData[i] = missing;
    }
  }
}
