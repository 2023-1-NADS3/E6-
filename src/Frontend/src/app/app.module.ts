import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TipoUsuarioComponent } from './tipo-usuario/tipo-usuario.component';
import { PesquisaDoarComponent } from './pesquisa-doar/pesquisa-doar.component';
import { AddAlimentoComponent } from './add-alimento/add-alimento.component';
import { PaginaOngComponent } from './pagina-ong/pagina-ong.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { MinhasSolicitacoesComponent } from './minhas-solicitacoes/minhas-solicitacoes.component';
import { MeusDadosComponent } from './meus-dados/meus-dados.component';
import { LoginComponent } from './login/login.component';
import { CadONGComponent } from './cad-ong/cad-ong.component';
import { CadUserComponent } from './cad-user/cad-user.component';
import { ConfCcComponent } from './conf-cc/conf-cc.component';
import { RecupPasswordComponent } from './recup-password/recup-password.component';
import { ConfEeComponent } from './conf-ee/conf-ee.component';
import { DeletarcontaComponent } from './deletarconta/deletarconta.component';
import { ComprovanteComponent } from './comprovante/comprovante.component';
import { FazerAgendamentoComponent } from './fazer-agendamento/fazer-agendamento.component';
import { HeaderComponent } from './header/header.component';

// transitions & Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

 // get forms data and bind them to variables
import { FormsModule } from '@angular/forms';
import { CategoriasComponent } from './categorias/categorias.component';
import { MeusAgendamentosComponent } from './meus-agendamentos/meus-agendamentos.component';
import { MeusLikesComponent } from './meus-likes/meus-likes.component';
import { StartComponent } from './start/start.component';
import { EmailComponent } from './email/email.component';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { AgendamentosdaminhaorderComponent } from './agendamentosdaminhaorder/agendamentosdaminhaorder.component';
import { MinhasdoacoesComponent } from './minhasdoacoes/minhasdoacoes.component';
import { OrdersComponent } from './orders/orders.component';
import { AjudaComponent } from './ajuda/ajuda.component';

@NgModule({
  declarations: [
    AppComponent,
    TipoUsuarioComponent,
    PesquisaDoarComponent,
    AddAlimentoComponent,
    PaginaOngComponent,
    PerfilUsuarioComponent,
    MinhasSolicitacoesComponent,
    MeusDadosComponent,
    LoginComponent,
    CadONGComponent,
    CadUserComponent,
    ConfCcComponent,
    RecupPasswordComponent,
    ConfEeComponent,
    DeletarcontaComponent,
    ComprovanteComponent,
    FazerAgendamentoComponent,
    HeaderComponent,
    CategoriasComponent,
    MeusAgendamentosComponent,
    MeusLikesComponent,
    StartComponent,
    EmailComponent,
    SolicitacaoComponent,
    AgendamentoComponent,
    AgendamentosdaminhaorderComponent,
    MinhasdoacoesComponent,
    OrdersComponent,
    AjudaComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router) {}
  user = "";
  autenticate(tipo : String){
    // @ts-ignore: Object is possibly 'null'.
    this.user = tipo;
  }
  getAtutentication(){
    return this.user;
  }
  autenticate_route(rota: String){
    if (rota == 'solicitacoes'){
      if (this.user == "doador"){
        return 'pesquisa';
      }
      else if (this.user == "ong"){
        return 'minhas-solicitacoes';
      }else{
        return '';
      }
    }else if(rota == 'comprovante'){
      if (this.user == "doador"){
        return 'agendando';
      }
      else if (this.user == "ong"){
        return 'comprovante';
      }else{
        return '';
      }
    }else{
      return '';
    }
  }
 }
