import { Component, OnInit, SystemJsNgModuleLoader, Input } from '@angular/core';
import { Parser } from 'expr-eval';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  /* Configuración de el componente gráfico de Google. */
  parser = new Parser();
  title = "";
  type = 'LineChart';
  formula = '';

  data = this.evaluateFunctionEuler('2 * t + 1', 0.5, 0, 0, 2);
  options = {
    hAxis: {
      title: 't'
    },
    vAxis: {
      title: 'x(t)'
    },
    crosshair: {
      color: '#000000',
      trigger: 'selection'
    },
    pointSize: 5,
    legend: { position: 'none' }
  };
  width = 400;
  height = 400;

  constructor() { }

  ngOnInit() {

  }

  /* Método de Euler. */
  evaluateFunctionEuler(funcionEntrada: string, h: number, aT: number, aX: number, b: number) {
    this.title = 'Euler';
    this.parser = new Parser();
    const data = [];
    let t0 = aT;
    let x0 = aX;
    data[0] = [t0, x0];
    const n = (b - aT) / h;
    let x: number;
    let t = t0 + h;

    for (let i = 1; t < b; t0 += h, x0 = x, i++) {
      t = t0 + h;
      x = x0 + this.evaluateFunction(funcionEntrada, t0, x0) * h;
      data[i] = [t, x];
    }
    return data;
  }

  /* Método de Euler Mejorado. */
  evaluateFunctionEulerMejorado(funcionEntrada: string, h: number, aT: number, aX: number, b: number) {
    this.title = 'Euler Mejorado';
    this.parser = new Parser();
    const data = [];
    let t0 = aT;
    let x0 = aX;
    data[0] = [t0, x0];
    const n = (b - aT) / h;
    let x: number;
    let xC: number;
    let t = t0 + h;

    for (let i = 1; t < b; t0 += h, x0 = xC, i++) {
      t = t0 + h;
      x = x0 + this.evaluateFunction(funcionEntrada, t0, x0) * h;
      xC = x0 + (this.evaluateFunction(funcionEntrada, t0, x0) + this.evaluateFunction(funcionEntrada, t, x)) * h / 2;
      data[i] = [t, xC];
    }
    return data;
  }

  /* Método de Runge Kutta. */
  evaluateFunctionRungeKutta(funcionEntrada: string, h: number, aT: number, aX: number, b: number) {
    this.title = 'Runge Kutta';
    this.parser = new Parser();
    const data = [];
    const rk = [];
    let t0 = aT;
    let x0 = aX;
    data[0] = [t0, x0];
    const n = (b - aT) / h;
    let x: number;
    let t = t0 + h;

    for (let i = 1; t < b; t0 += h, x0 = x, i++) {
      let aux: number;
      aux = 0;
      t = t0 + h;

      rk[0] = [h * this.evaluateFunction(funcionEntrada, t0, x0)];
      aux += Number(rk[0]);
      for (let k = 1; k <= 3; k++) {
        if (k !== 3) {
          rk[k] = [h * this.evaluateFunction(funcionEntrada, t0 + (h / 2), x0 + rk[i - 1] / 2)];
          aux += (2 * Number(rk[k]));
        } else {
          rk[k] = [h * this.evaluateFunction(funcionEntrada, t0 + h, x0 + rk[i - 1])];
          aux += Number(rk[k]);
        }
      }

      x = x0 + Number(aux) / 6;
      data[i] = [t, x];
    }
    return data;
  }

  /* Evaluación de la función ingresada.Utilizamos la librería de 'expr-eval'. */
  evaluateFunction(funcionEntrada: string, t0: number, x0: number) {
    this.parser = new Parser();
    return Parser.evaluate(funcionEntrada, { t: t0, x: x0 });
  }

}
  // h = (b - a)/n; -> b = n * h + t0
