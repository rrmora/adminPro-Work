import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  constructor(private toast: ToastrService) { }

  SuccesNotification(Titulo: string, mensaje: string) {
    this.toast.success(mensaje, Titulo, { timeOut: 2000, progressBar: true, progressAnimation: 'increasing' })
  }

  ErrorNotification(Titulo: string, mensaje: string) {
    this.toast.error(mensaje, Titulo, { timeOut: 2000, progressBar: true, progressAnimation: 'increasing' })
  }

  InfoNotification(Titulo: string, mensaje: string) {
    this.toast.info(mensaje, Titulo, { timeOut: 2000, progressBar: true, progressAnimation: 'increasing' })
  }
  
  WarningNotification(Titulo: string, mensaje: string) {
    this.toast.warning(mensaje, Titulo, { timeOut: 2000, progressBar: true, progressAnimation: 'increasing' })
  }
}
