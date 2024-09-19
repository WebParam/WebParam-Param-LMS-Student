import { ISeries } from "./IChart";


export const mainColor= "#eb4224";
export const mainColorRgb= "235, 66, 36";

//RADIAL
export const radialOptions =  {
    chart: {
    type: 'radialBar',
    offsetY: -20,
    sparkline: {
    enabled: true
    }
    },
    plotOptions: {
    radialBar: {
    startAngle: -90,
    endAngle: 90,
    track: {
    background: "#e7e7e7",
    strokeWidth: '97%',
    margin: 5, // margin is in pixels
    dropShadow: {
    enabled: true,
    top: 2,
    left: 0,
    color: '#999',
    opacity: 1,
    blur: 2
    }
    },
    dataLabels: {
    name: {
    show: false
    },
    value: {
    offsetY: -2,
    fontSize: '18px'
    }
    }
    }
    },
    grid: {
    padding: {
    top: -10
    }
    },
    fill: {
    type: 'solid',
    gradient: {
    shade: 'light',
    shadeIntensity: 0.4,
    inverseColors: false,
    opacityFrom: 1,
    opacityTo: 1,
    stops: [0, 120, 113, 111]
    },
    },
    labels: ['Average Results'],
    
    };

export const radialSeries = [{ data:[76]}];

//SPARKLINE
export const sparkLineSeries= [{
    data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
  }];

export const sparkLineOptions= {
    chart: {
      type: 'line',
      width: 100,
      height: 35,
      sparkline: {
        enabled: true
      }
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function (seriesName:any) {
            return seriesName;
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  //LINE
  
 export const areaChartSeries= [{
    data: [12, 14, 2, 47, 42, 15, 47, 56, 65, 19, 14,12]
  }] as ISeries[];
  
  
  export const areaChartOptions= 
  {
    chart: {
      type: 'area',
    
      sparkline: {
        enabled: true
      }
    },
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'],
    xaxis: {
     
        type: 'string',  // This ensures the X-axis handles dates
        labels: {
          format: 'MMM',  // Format to display month and year
        },
        categories: [
       "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"
        ],
        
        title: {
          text: 'Date',
          style: {
            color: '#333',
            fontSize: '14px',
            fontWeight: 600,
          }
        }
      },
    tooltip: {  
      fixed: {
        enabled: false
      },
      x: {
        show: true
      },
      y: {
        title: {
          formatter: function (seriesName:any) {
            return ''
          }
        }
      },
      marker: {
        show: false
      }
    }
  };

  