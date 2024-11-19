import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ToastController, LoadingController } from '@ionic/angular'; // Para mostrar mensajes emergentes
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  hidePassword: boolean = true;
  isLoading = false; // Variable inicial de la animacion de carga

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: LoginService, // Inyectar el servicio
    private toastController: ToastController, // Inyectar el controlador de Toast
    private loadingController: LoadingController // Inyectar el controlador de Loading
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'danger'
    });
    await toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Verificando...',
      spinner: 'circles', // Puedes elegir entre varios estilos de spinner
    });
    await loading.present();
  }

  async dismissLoading() {
    await this.loadingController.dismiss();
  }


  onLogin() {
    if (this.loginForm.valid) {
      this.presentLoading();
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: async (response) => {// Si el inicio de sesión es exitoso
          await this.dismissLoading(); // Ocultar el spinner de carga

          const { accessToken, id, rol, nombre } = response.dataUser; // Extrae el token del usuario autenticado
          await Preferences.set({ key: 'authToken', value: accessToken });// Guarda el token en @capacitor/preferences
          await Preferences.set({ key: 'userId', value: id });
          await Preferences.set({ key: 'userRole', value: rol });
          await Preferences.set({ key: 'userName', value: nombre });

          this.router.navigate(['/tabs']);//redirigue a pagina de inicio
        },
        error: async (error) => {
          // Si el inicio de sesión falla
          await this.dismissLoading(); // Ocultar el spinner de carga
          this.presentToast('Correo o contraseña incorrectos');
        }
      });
    }
  }
}
