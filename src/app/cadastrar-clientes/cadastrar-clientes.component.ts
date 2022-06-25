import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';  
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cadastrar-clientes',
  templateUrl: './cadastrar-clientes.component.html',
  styleUrls: ['./cadastrar-clientes.component.css']
})
export class CadastrarClientesComponent implements OnInit {
  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro   : string = '';
  constructor(
    //inicializando por injeção de dependência
    private httpClient : HttpClient
  ) { }

  //criando o modelo do formulário
  formCadastro = new FormGroup({

    //campo para preenchimento do nome
    nome: new FormControl('', [
      Validators.required, //campo obrigatório
      Validators.minLength(10), //mínimo de caracteres
      Validators.maxLength(150), //máximo de caracteres
    ]),
    //campo para preenchimento do email
    email: new FormControl('', [
      Validators.required, //campo obrigatório
      Validators.minLength(10), //mínimo de caracteres
      Validators.maxLength(150), //máximo de caracteres
    ]),

    //campo para preenchimento do cpf
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(11), //mínimo de caracteres
      Validators.maxLength(11) //máximo de caracteres
    ]),

    //campo para preenchimento da data de nascimento
    dataNascimento: new FormControl('', [
      Validators.required
    ])

  });

  ngOnInit(): void {
  }

  //função para acessar os campos do formulário na página HTML
  get form(): any {
    return this.formCadastro.controls;
  }

  //função para executar a ação do SUBMIT do formulário
  onSubmit(): void {
    this.limparMensagens();

    this.httpClient.post(environment.apiUrl + "/clientes", this.formCadastro.value)
      .subscribe(
        (data:any) => { //resposta de sucesso!
          this.mensagem_sucesso = data.message;
          this.formCadastro.reset();
        },
        e => { //resposta de erro!
          //verificar o tipo do erro obtido
          switch(e.status) { //código do erro

            case 400:
              this.mensagem_erro = 'Ocorreram erros de validação nos dados enviados.';
              break;

            case 422:
              this.mensagem_erro = e.error.message;
              break;

            case 500:
              this.mensagem_erro = "Erro! Entre em contato com o suporte.";
              break;
          } 
        }
      );
  }

  //função para limpar as mensagens
  limparMensagens(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
  }



}
