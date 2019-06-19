import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  funcionInput: string;
  hInput: number;
  bInput: number;
  x0Input: number;
  t0Input: number;
  funcionSeleccionada: string;
  h: number;
  b: number;
  x0: number;
  t0: number;

  guardarFuncion() {
    this.funcionSeleccionada = this.funcionInput;
    this.h = this.hInput;
    this.b = this.bInput;
    this.t0 = this.t0Input;
    this.x0 = this.x0Input;
  }
}
