import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '@models/user';
import { Login } from '@models/login';
import { Sale } from '@models/sale';
import { Provider } from '@models/provider';
import { Client } from '@models/client';
import { Categori } from '@models/categori';
import { Subcategori } from '@models/subcategori';
import { Rol } from '@models/rol';
import { Product } from '@models/product';
declare var $:any;

@Injectable({
  providedIn: "root"
})
export class GlobalService {
  dates: Array<any> = [];
  themes = {
    white: {
      bg: "bg-white",
      tx: "dark-text"
    },
    black: {
      bg: "bg-dark",
      tx: "white-text"
    }
  };
  foto:any='';
  img:any='';
  urlApi = "http://localhost:3000/";
  columnsTable: Array<any> = [];
  theme = this.themes.white;
  nameApp: String = "Abarrotes";
  copyApp: String = `Copy ${this.nameApp}`;
  stylesApp: Object = {
    colorApp: "primary",
    colorTextApp: "white-text",
    backgroundApp: "bg-dark",
    tableStyles: "centered highlight"
  };
  users: User[] = [];
  sales: Sale[] = [];
  clients: Client[] = [];
  providers: Provider[] = [];
  categories: Categori[] = [];
  subcategories: Subcategori[] = [];
  rols: Rol[] = [];
  products: Product[] = [];
  
  selectedLogin: Login = new Login();
  selectedSale: Sale = new Sale();
  selectedClient: Client = new Client();
  selectedUser: User = new User();
  selectedProvider: Provider = new Provider();
  selectedCategori: Categori = new Categori();
  selectedSubcategori: Subcategori = new Subcategori();
  selectedRol: Rol = new Rol();
  selectedProduct: Product = new Product();

  accion: String;
  page: String;
  noUsers: number;
  diasSemana = new Array("Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb");
  meses = new Array(
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic"
  );
  colors = [
    {
      nombre: "rojo",
      color: "red"
    }
  ];
  constructor() {}

  getPassword() {
    // const opc_letras = true; //  FALSE para quitar las letras
    // const opc_numeros = true; // FALSE para quitar los números
    // const opc_letrasMayus = true; // FALSE para quitar las letras mayúsculas
    // const opc_especiales = true; // FALSE para quitar los caracteres especiales
    const longitud = 8;
    let password = "";
    // const letras = 'abcdefghijklmnopqrstuvwxyz';
    // const numeros = '1234567890';
    // const letrasMayus = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // const especiales = '|@#~$%+-_';
    const todos =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890|@#~$%+-_";
    const listado = todos.split("");

    for (let i = 0; i < longitud; i++) {
      password += listado[Math.floor(Math.random() * todos.length)];
    }
    let contrasena = "";
    for (const dato_password of password) {
      contrasena += dato_password;
    }
    return contrasena;
  }
  goChangeTheme(type) {
    type ? (this.theme = this.themes.white) : (this.theme = this.themes.black);
    this.setTheme(type ? 1 : 0);
  }
  goChangeThemeSaved(type) {
    type == 1
      ? (this.theme = this.themes.white)
      : (this.theme = this.themes.black);
    this.setTheme(type);
  }
  setTheme(type) {
    localStorage.setItem("theme", type);
  }
  getTheme() {
    return localStorage.getItem("theme");
  }
  firstTheme() {
    this.goChangeThemeSaved(this.getTheme());
  }
  formatFecha(fg: FormGroup) {
    const date: string = fg.value;
    const x = new Date();
    const fecha: any = date ? date.split("-") : ["", "", ""];
    x.setFullYear(fecha[0], fecha[1] - 1, fecha[2]);
    const today = new Date();
    return !(x.getTime() >= today.getTime()) ? { minus: true } : null;
  }
  formatFechaLates(fg: FormGroup) {
    const dateLates: string = fg.controls.periodo_inicio.value;
    const dateNext: string = fg.controls.periodo_termino.value;
    const xlates = new Date();
    const xNext = new Date();
    const fechaLates: any = dateLates ? dateLates.split("-") : ["", "", ""];
    const fechaNext: any = dateNext ? dateNext.split("-") : ["", "", ""];
    xlates.setFullYear(fechaLates[0], fechaLates[1] - 1, fechaLates[2]);
    xNext.setFullYear(fechaNext[0], fechaNext[1] - 1, fechaNext[2]);
    return !(xlates.getTime() < xNext.getTime()) ? { date: true } : null;
  }
  clearPhoto(){
    this.foto=null;
    this.img=''
  }
  configDataTable(){
    $("select").addClass("form-control");
    $(".dataTables_filter>label>input").addClass("form-control");
    $(".dataTables_paginate>span>a,.dataTables_paginate>a").addClass(
      "btn btn-sm btn-primary"
    );
    $(".dataTables_paginate>a,.dataTables_paginate>span>a").removeClass(
      "paginate_button"
    );
    // $(".dataTables_paginate>a").removeClass("paginate_button");
    $(".dataTables_paginate>span>a.current").addClass("active");
  }

}
