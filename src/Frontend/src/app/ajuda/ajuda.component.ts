import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { slideToSide, slideToSideFromRight, slideAnimationWithLeave} from '../slideAnimation';

@Component({
  selector: 'app-ajuda',
  templateUrl: './ajuda.component.html',
  styleUrls: ['./ajuda.component.css'],
  animations: [slideToSide, slideToSideFromRight, slideAnimationWithLeave]
})
export class AjudaComponent {

  public state: number = 1;
  constructor(private router: Router) { }
  

  goTo(path: string) {
    this.router.navigateByUrl(`${path}`)
  }

}
