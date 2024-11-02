import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit{

  constructor(private router: Router) {}

  async ngOnInit(){
    // Verificar si existe un token al iniciar la aplicación
    const token = await Preferences.get({ key: 'authToken' });
    
    if (token.value) {
      // Si existe el token, redirige a la página principal (tabs)
      this.router.navigate(['/tabs']);
    } else {
      // Si no existe el token, redirige a la página de inicio de sesión
      this.router.navigate(['/login']);
    }
  }
    
  
}
