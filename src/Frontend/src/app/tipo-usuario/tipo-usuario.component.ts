import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent {
constructor(private router: Router, private app: AppModule) {}
 goToPage(pageName:string, user:string){
  this.app.autenticate(user);
  this.router.navigate([`${pageName}`]);
}
}
