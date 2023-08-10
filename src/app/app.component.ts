import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import GanttModule from 'highcharts/modules/gantt';
import 'zone.js';
import 'zone.js/dist/long-stack-trace-zone.js';
GanttModule(Highcharts);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor = 'ganttChart';
  chartOptions: Highcharts.Options = {
    chart: {
      scrollablePlotArea: {
        minWidth: 40 * 48, // 48 weeks, 40px each
        scrollPositionX: 0, // Start at beginning
      },
      height: '275',
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      gantt: {
        pointWidth: 50,
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
    /** MONTH WISE x-Axis*/
    // xAxis: [{
    //   labels: {
    //     format: '{value:%W}',
    //     style: {
    //           color: '#454343',        // Text color of the label
    //           backgroundColor: '#FBFBFB' // Background color of the label
    //       }
    //   },
    //   grid: {
    //     enabled: true,
    //     borderColor: '#e2e5eb',
    //     cellHeight: 32
    //   },
    // lineColor: '#FBFBFB',
    // tickInterval: 7 * 24 * 3600 * 1000,
    // min: Date.UTC(2023, 0, 1),
    // max: Date.UTC(2023, 11, 31),
    // minorGridLineWidth: 1,
    // gridLineWidth: 1,
    // plotLines: [{
    //   color: '#FFCECE',
    //   width: 35,
    //   value: Date.UTC(2023, 6, 7),
    //   label: {
    //     text: 'Safety Stock Date',
    //     rotation: 270,
    //     y: 15,
    //     textAlign: 'right'
    // }
    // }],
    // plotBands: [
    //   {
    //     color: '#EEF5FF', // choose a color for the highlight
    //     from: this.getCurrentWeekRange().start,
    //     to: this.getCurrentWeekRange().end,
    //     zIndex: 0
    //   }
    // ]
    // }],
    // week wise x-Axis
    xAxis: [
      {
        labels: {
          format: '{value:%W}',
          style: {
            color: '#454343', // Text color of the label
            backgroundColor: '#FBFBFB', // Background color of the label
          },
        },
        grid: {
          enabled: true,
          borderColor: '#e2e5eb',
          cellHeight: 32,
        },
        lineColor: '#FBFBFB',
        tickInterval: 7 * 24 * 3600 * 1000,
        //tickInterval: 7 * 24 * 36e5, // one week
        min: Date.UTC(2023, 0, 1),
        max: Date.UTC(2023, 11, 31),
        minorGridLineWidth: 12,
        gridLineWidth: 1,
        plotLines: [
          {
            color: '#FFCECE',
            width: 35,
            value: Date.UTC(2023, 8, 26),
            label: {
              text: 'Stock Limit',
              rotation: 270,
              y: 15,
              textAlign: 'right',
            },
          },
        ],
      },
    ],
    yAxis: {
      categories: ['Category 1', 'Category 2', 'Category 3'],
      grid: {
        enabled: false,
      },
      labels: {
        enabled: false, // This will hide the y-axis labels
      },
      title: {
        text: null, // This will hide the y-axis title
      },
      plotLines: [
        {
          width: 20,
        },
      ],
    },
    tooltip: {
      enabled: true,
    },
    series: [
      {
        name: 'Category 1',
        type: 'gantt',
        data: [
          {
            start: Date.UTC(2023, 1, 2),
            end: Date.UTC(2023, 5, 22),
            color: '#f4f5f7',
            y: 0,
          },
        ],
      },
      {
        name: 'Category 2',
        type: 'gantt',
        data: [
          {
            start: Date.UTC(2023, 6, 2),
            end: Date.UTC(2023, 8, 22),
            color: '#f4f5f7',
            y: 1,
          },
        ],
      },
      {
        name: 'Category 3',
        type: 'gantt',
        data: [
          {
            start: Date.UTC(2023, 8, 1),
            end: Date.UTC(2023, 11, 22),
            color: '#f4f5f7',
            y: 2,
          },
        ],
      },
      {
        name: 'Assignee 1',
        type: 'scatter',
        marker: {
          symbol:
            'url(https://raw.githubusercontent.com/dsmriti/gantt/master/src/assets/testing.png)',
        },
        data: [
          {
            x: Date.UTC(2023, 2, 6),
            y: 0,
          },
        ],
      },
      {
        name: 'Assignee 2',
        type: 'scatter',
        marker: {
          symbol:
            'url(https://raw.githubusercontent.com/dsmriti/gantt/master/src/assets/search.png)',
        },
        data: [
          {
            x: Date.UTC(2023, 2, 9),
            y: 0,
          },
        ],
      },
      {
        name: 'Assignee 3',
        type: 'scatter',
        marker: {
          symbol:
            'url(https://raw.githubusercontent.com/dsmriti/gantt/master/src/assets/truck.png)',
        },
        data: [
          {
            x: Date.UTC(2023, 4, 7),
            y: 0,
          },
        ],
      },
      {
        name: 'Assignee 4',
        type: 'scatter',
        marker: {
          symbol:
            'url(https://raw.githubusercontent.com/dsmriti/gantt/master/src/assets/warehouse.png)',
        },
        data: [
          {
            x: Date.UTC(2023, 5, 7),
            y: 0,
          },
        ],
      },
      {
        name: 'Assignee 5',
        type: 'scatter',
        marker: {
          symbol:
            'url(https://raw.githubusercontent.com/dsmriti/gantt/master/src/assets/testing.png)',
        },
        data: [
          {
            x: Date.UTC(2023, 8, 14),
            y: 1,
          },
        ],
      },
      {
        name: 'Assignee 6',
        type: 'scatter',
        marker: {
          symbol:
            'url(https://raw.githubusercontent.com/dsmriti/gantt/master/src/assets/search.png)',
        },
        data: [
          {
            x: Date.UTC(2023, 8, 17),
            y: 2,
          },
        ],
      },
      {
        name: 'Assignee 7',
        type: 'scatter',
        marker: {
          symbol:
            'url(https://raw.githubusercontent.com/dsmriti/gantt/master/src/assets/truck.png)',
        },
        data: [
          {
            x: Date.UTC(2023, 9, 17),
            y: 2,
          },
        ],
      },
      {
        name: 'Assignee 8',
        type: 'scatter',
        marker: {
          symbol:
            'url(https://raw.githubusercontent.com/dsmriti/gantt/master/src/assets/warehouse.png)',
        },
        data: [
          {
            x: Date.UTC(2023, 10, 16),
            y: 2,
          },
        ],
      },
    ],
  };

  ngOnInit(): void {}
}
