import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pagina-da-solicitacao',
  templateUrl: './pagina-da-solicitacao.component.html',
  styleUrls: ['./pagina-da-solicitacao.component.css']
})
export class PaginaDaSolicitacaoComponent {
  constructor(private router: Router) {}
  goToPage(pageName:string){
   this.router.navigate([`${pageName}`]);
 }
}
