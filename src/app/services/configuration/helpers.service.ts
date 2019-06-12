import { Injectable } from '@angular/core';
declare var toastr: any;
@Injectable({
  providedIn: 'root'
})
export class HelpersService {
  res: String='';
  constructor() {
    // toastr.options = {
    //   "closeButton": false,
    //   "debug": false,
    //   "newestOnTop": true,
    //   "progressBar": false,
    //   "positionClass": "toast-bottom-right",
    //   "preventDuplicates": true,
    //   "onclick": null,
    //   "showDuration": "100",
    //   "hideDuration": "500",
    //   "timeOut": "2000",
    //   "extendedTimeOut": "1000",
    //   "showEasing": "swing",
    //   "hideEasing": "linear",
    //   "showMethod": "slideDown",
    //   "hideMethod": "slideUp"
    // }
    toastr.options = {
      closeButton: true,
      // debug: true,
      newestOnTop: false,
      progressBar: true,
      positionClass: 'toast-top-right',
      // "positionClass": "toast-bottom-full-width",
      preventDuplicates: true,
      onclick: null,
      showDuration: '300',
      hideDuration: '1000',
      timeOut: '2000',
      extendedTimeOut: '1000',
      showEasing: 'swing',
      hideEasing: 'linear',
      showMethod: 'slideDown',
      hideMethod: 'slideUp'
    };
  }
  msgError(  mensage) {
    toastr.error(mensage,'Error');
  }
  msgWarning( mensage) {
    toastr.warning(mensage,'Cuidado');
  }
  msgSuccess( mensage) {
    toastr.success(mensage,'Listo');
  }
  msgInfo( mensage) {
    toastr.info( mensage,'Informacíon');
  }
  verifyTouched(field): string {
    if (!field.touched) {
      return '';
    }
    return field.valid ? 'is-valid' : 'is-invalid';
  }
  goError(error): String {
    this.res='';
    if (error.code) {
      switch (error.code) {
        case 11000:
          this.res+= 'verifique sus datos no puede haber duplicados.';
          break;
        default:
          break;
      }
    }
    if (error.error.error) {
      this.res += ' '+error.error.error
    }
    if (error.status) {
      switch (parseInt(error.status)) {
        case 0:
          this.res += ' No se a podido conectar con el servidor intende de nuevo mas tarde.';
          break;
        case 404:
          this.res += ' No se pudo localizar el elemento.';
          break;
        case 500:
          this.res += ' Error en el servidor';
          break;
      
        case 401:
          this.res += ' Sin autorizacíon';
          break;
      
        default:
          break;
      }
    }
    return this.res;
  }
  getIgm(file): Promise<any> {
    const reader = new FileReader();
    return new Promise((resolve: any, reject: any) => {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        reader.onload = (function (theFle: any) {
          return (e: any) => {
            resolve(e.target.result);
          };
        })(file);
        reader.readAsDataURL(file);
      } else {
        reject(Error('Tipo de imagen invalida'));
      }
    });
  }
}
