import { Component, OnInit, ViewChild } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';



@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss'],
})
export class PerfilUsuarioComponent  implements OnInit {


  isVisible = false;
  userName: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.cargarNombreUsuario();
  }

  async cargarNombreUsuario(): Promise<void> {
    const { value } = await Preferences.get({ key: 'userName' });
    if (value) {
      this.userName = value;
    }
  }

  irAPerfilUsuario() {//Recibimos el id
    this.isVisible = true;
    
  }
  
  closeModal() {
    this.isVisible = false;
  }

  async cerrarSesion(): Promise<void> {
    // Borrar cada clave individual de la información del usuario
    await Preferences.remove({ key: 'authToken' });
    await Preferences.remove({ key: 'userId' });
    await Preferences.remove({ key: 'userName' });
    await Preferences.remove({ key: 'userRole' });
    await Preferences.remove({ key: 'i18nextLng' });

    // Redirigir al usuario a la pantalla de inicio de sesión sin opción de regresar
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
