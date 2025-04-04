import { Component, Input, OnInit } from '@angular/core';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
  colors: string[];
};


@Component({
  selector: 'grafico-barras-acumulado',
  standalone: false,
  templateUrl: './barras-acumulado.component.html',
  styleUrl: './barras-acumulado.component.css'
})
export class BarrasAcumuladoComponent implements OnInit {


  @Input()
  public data : ApexAxisChartSeries | undefined;

  public chartOptions: ChartOptions;


  constructor( ){
    this.data = this.generateSample();
    this.chartOptions = this.generateChart();
  }

  
  ngOnInit(): void {
    console.log("Data en componente:", JSON.stringify(this.data))
    this.chartOptions = this.generateChart();
  }

  private calcularReformas(){
    
  }

  private generateChart():ChartOptions{
    return {
      series: this.data?this.data:this.generateSample(),
      chart: {
        type: "bar",
        height: 350,
        stacked: true
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      stroke: {
        width: 1,
        colors: ["#fff"]
      },
      title: {
        text: "Simulación Historia Laboral por Reformas",
        align: 'center',
        style: {
          fontSize: '17px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          color: "var(--GrapLabel)"
        }
      },
      xaxis: {
        categories: ["Gaviria", "Uribe", "Duque", "Petro", "Sin Reforma","Con Reforma"],
        labels: {
          formatter: function(val) {
            let num = parseInt(val);
            num = Math.round(num/1000)/1000;
            let x = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD'
            }).format(num);
            return x + " M";
          },
          style: {
            fontSize: '15px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: "var(--GrapLabel)"
          }
        }
      },
      yaxis: {
        title: {
          text: undefined
        },
        labels: {
          style: {
            fontSize: '15px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: "var(--GrapLabel)"
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            return val + " M";
          }
        }
      },
      fill: {
        //opacity: 1.5
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        //offsetX: 40
      },
      dataLabels : {
        formatter: function(val:number) {
          let num = Math.round(val/1000)/1000;
          let x = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(num);
          return x + " M";
        },
        style: {
          fontSize: '15px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          fontWeight: 'bold',
          colors: ["var(--GrapLabel)"]
        }
      },
      colors : ["var(--G50BA)","var(--U789BA)","var(--D2101BA)","var(--P2025BA)"]
    };
  }


  private generateSample(){
    return [{
      name: "Ley 50 1990",
      data: [1000,0,0,0,100, 100]
    },
    {
      name: "Ley 789 de 2002",
      data: [0,800,0,0,600, 600]
    },
    {
      name: "Ley 2101 de 2021",
      data: [0,0,870,0,100, 250]
    },
    {
      name: "Propuesta 2025",
      data: [0,0,0,1100,200,0]
    }];
  }
}

/**
 * Esta gráfica es bastante diciente pero compleja 
 * Muestra el valor total devengado durante su vida laboral por tipo de reforma 
 * Pero además realiza un total por tipo de ley aplicada durante la vida laboral 
 * asi liquidará con:
 * ley 50 para la historia laboral antes de 1993
 * Ley 789 entre 2004 y 2024
 * Ley 2021 entre 2024 y  2026
 * Petro desde 2026 en adelante. 
 */


