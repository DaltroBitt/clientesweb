import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; 
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {

  //atributos
  mensagem_sucesso: string = '';
  mensagem_erro   : string = '';

  constructor(
    private httpClient : HttpClient,
    private activatedRoute : ActivatedRoute
            
  ) { }

  //criando o modelo do formulário
  formEdicao = new FormGroup({

    //campo para armazenar o id do cliente
    idCliente : new FormControl('',[]),
    
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

    //ler o id do cliente enviado pela url
    const idCliente = this.activatedRoute.snapshot.paramMap.get('idClienteRota');

    //consultar o cliente na API através do id do cliente
    this.httpClient.get(environment.apiUrl+'/clientes/'+idCliente)
         .subscribe(
            (data:any) => {
              //aqui trato o campo tipo datetime ficar apenas como tipo date
              // split('T') pega a informação que está a esquerda do T da data
              data.dataNascimento = data.dataNascimento.split('T')[0];
              //tratar nome
              data.nome = data.nome.toUpperCase();
              data.email = data.email.toLowerCase();
              this.formEdicao.patchValue(data);
            }
         )
 
  }

  get form():any{
    return this.formEdicao.controls;
  }

  //função para limpar as mensagens
  limparMensagens(): void {
    this.mensagem_sucesso = '';
    this.mensagem_erro = '';
  }

  onSubmit(): void{
    this.limparMensagens();
    //fazendo a requisição para a API..
    this.httpClient.put(environment.apiUrl + "/clientes", this.formEdicao.value)
    .subscribe(
      (data:any) => { //retorno de sucesso 2xx
        //exibir mensagem de sucesso na página
        this.mensagem_sucesso = data.message;
      },
      e => { //retorno de erro 4xx ou 5xx         
        //verificar o tipo do erro obtido
        switch(e.status) { //código do erro
          case 400:
            this.mensagem_erro = 'Ocorreram erros de validação nos dados enviados.';
            break;
          case 422:
            this.mensagem_erro = e.error.message;
            break;
          case 500:
            this.mensagem_erro = "Erro! Entre  em contato com o suporte.";
            break;
        } 
      }
    )
  }
}
