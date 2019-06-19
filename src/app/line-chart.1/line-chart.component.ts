import { Component, OnInit, SystemJsNgModuleLoader, Input } from '@angular/core';
import { Parser } from 'expr-eval';

@Component({
  selector: 'app-line-chart1',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChart1Component implements OnInit {
  parser = new Parser();
  title = "";
  type = 'LineChart';
  formula = '';

  data = this.evaluateFunctionEulerMejorado('2 * t ', 0.5, 0, 0, 2);
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
    pointSize:5,
    legend: { position: 'none' }
  };
  width = 400;
  height = 400;

  constructor() { }

  ngOnInit() {

  }


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

  evaluateFunction(funcionEntrada: string, t0: number, x0: number) {
    this.parser = new Parser();
    return Parser.evaluate(funcionEntrada, { t: t0, x: x0 });
  }

}
  // h = (b - a)/n; -> b = n * h + t0

  // ['Feb', 6.9, 0.8, 0.6, 4.2],
  // ['Mar', 9.5, 5.7, 3.5, 5.7],
  // ['Apr', 14.5, 11.3, 8.4, 8.5],
  // ['May', 18.2, 17.0, 13.5, 11.9],
  // ['Jun', 21.5, 22.0, 17.0, 15.2],
  // ['Jul', 25.2, 24.8, 18.6, 17.0],
  // ['Aug', 26.5, 24.1, 17.9, 16.6],
  // ['Sep', 23.3, 20.1, 14.3, 14.2],
  // ['Oct', 18.3, 14.1, 9.0, 10.3],
  // ['Nov', 13.9, 8.6, 3.9, 6.6],
  // ['Dec', 9.6, 2.5, 1.0, 4.8]

  // [0, 0, 0], [1, 10, 5], [2, 23, 15], [3, 17, 9], [4, 18, 10], [5, 9, 5],
  // [6, 11, 3], [7, 27, 19], [8, 33, 25], [9, 40, 32], [10, 32, 24], [11, 35, 27],
  // [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
  // [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
  // [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
  // [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
  // [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
  // [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
  // [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
  // [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
  // [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
  // [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]

// @Input()
  // funcion: string;
  // @Input()
  // h: number;
  // @Input()
  // t0: number;
  // @Input()
  // x0: number;
  // @Input()
  // b: number;

  // data = this.evaluateFunctionEuler(this.formula, this.h, this.t0, this.x0, this.b);
