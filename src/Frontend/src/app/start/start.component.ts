import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {


  constructor(private router: Router){}


  goTo(url: string){
    this.router.navigateByUrl(`/${url}`)
  }
}
