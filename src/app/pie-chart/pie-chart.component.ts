import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  title = 'Browser market shares at a specific website, 2019';
  type = 'PieChart';
  data = [
    ['Chrome', 90.8],
    ['IE', 8.5],
    ['Safari', 1.0],
  ];
  columnNames = ['Browser', 'Percentage'];
  options = { };
  width = 550;
  height = 400;

  constructor() { }

  ngOnInit() {
  }

}
