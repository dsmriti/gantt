import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import GanttModule from 'highcharts/modules/gantt';
GanttModule(Highcharts);
import {
  ganttSeriesMock,
  scatterSeriesMock,
} from 'src/mock-data/gantt-chart.data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'ganttChart';
  seriesData: Highcharts.SeriesOptionsType[] = []; // array for combined gantt and scatter data of chart series
  plotBreaks: any[] = []; // array to plot breaks for dynamic column width of x-axis
  ganttPlotData: any[] = [];
  scatterPlotData: any[] = [];
  plotBreakSize = 4.5;

  public chartOptions: Highcharts.Options = {
    chart: {
      type: 'Gantt',
      scrollablePlotArea: {
        minWidth: 55 * 52, // 52 weeks, 55px each
        scrollPositionX: 0,
      },
    },
    legend: {
      enabled: false,
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      gantt: {
        pointWidth: 55,
        stickyTracking: false,
        enableMouseTracking: false,
      },
      series: {
        states: {
          hover: {
            enabled: true, // Enable hover state
          },
          inactive: {
            opacity: 1, // Ensures that all data points remain fully visible even if one is hovered over
          },
        },
      },
    },
    tooltip: {
      enabled: true,
      formatter: function () {
        return 'Date: ' + new Date(this.x?.valueOf() || '').toDateString();
      },
    },
    xAxis: [
      {
        type: 'datetime',
        dateTimeLabelFormats: {
          week: '%e%b', // format to show the first date & its month on graph
        },
        labels: {
          style: {
            color: '#454343', // Text color of the label
            backgroundColor: '#fbfbfb', // Background color of the label
          },
        },
        grid: {
          enabled: true,
          borderColor: '#e2e5eb',
          cellHeight: 32,
        },
        lineColor: '#fbfbfb',
        /**
         * tickInterval indicates as follows:
          7: Number of days.
          24: Hours in a day.
          3600: Seconds in an hour.
          1000: Milliseconds in a second.
         */
        tickInterval: 7 * 24 * 3600 * 1000, // to display weeks as the main intervals on a timeline
        minorGridLineWidth: 1,
        gridLineWidth: 1,
        min: Date.UTC(2023, 0, 1),
        max: Date.UTC(2023, 11, 31),
      },
    ],
    yAxis: {
      categories: [],
      staticScale: 65.5, // sets the row height of y-axis
      grid: {
        enabled: false,
      },
      labels: {
        enabled: false, // This will hide the y-axis labels
      },
      title: {
        text: null, // This will hide the y-axis title
      },
    },
    series: this.seriesData,
  };

  public formSeries() {
    let ganttData = ganttSeriesMock;
    let scatterData = scatterSeriesMock;
    let datemapping: any = {};
    let filteredScatterData: any[] = [];

    // for every date create a event count data for each row.
    // the event count data is in format { date: { row_index: count } }
    scatterData.forEach((element) => {
      let y = element.data[0].y;
      let x = element.data[0].x;

      // checks if datemapp doesn't contain y, then create y
      if (!datemapping[y]) {
        datemapping[y] = new Map();
      }
      /**checks if any date exist then increase count for hasmap
      the hasmap key has record of number of date occurence of single date. **/
      if (datemapping[y].has(x)) {
        datemapping[y].set(x, datemapping[y].get(x) + 1);
      } else {
        datemapping[y].set(x, 1);
      }

      element.data[0].x = new Date(
        new Date(x).setMinutes(datemapping[y].get(x) * 350) //it adds 350 minute to this
      ).getTime();

      filteredScatterData.push(element);

      this.plotBreaks.push({
        from: element.data[0].x,
        to: element.data[0].x,
        breakSize: 24 * 3600 * 1000 * this.plotBreakSize,
      });
    });
    this.seriesData = [...ganttData, ...filteredScatterData];
    return this.seriesData;
  }

  public formChartOptions() {
    let updatedChartAxis: any = this.chartOptions.xAxis;
    updatedChartAxis[0].breaks = this.plotBreaks;
    this.chartOptions = {
      ...this.chartOptions,
      series: this.seriesData,
      xAxis: updatedChartAxis,
    };
  }

  renderGraph() {
    this.ganttPlotData = ganttSeriesMock;
    this.scatterPlotData = scatterSeriesMock;
    this.formSeries();
    this.formChartOptions();
  }

  ngOnInit(): void {
    this.renderGraph();
  }
}
