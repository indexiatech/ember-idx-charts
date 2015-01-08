# Ember-idx-charts

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

### Usage
The component is designed for ease of use. 
It supplies default colours and highlights that can be overriden and easy access to chart options via bindings.
All chart options can be defined simultaneously by passing an options object (see Chartjs documantion).

1. Data types:
  1.1 Components can render charts from an objects defined like a Chartjs object.
  1.2 Pie and Doughnut component can render charts from an object defined as: {Label: Value, Label: Value...}
  1.3 Line and Bar components can render charts from an array of maps as : {Label: Value...}. Labels should be           consistent across maps.
  1.4 If components recieved data NOT as Chartjs objects, it'll add colours and highlights automatically.

2. Components:
  2.1 {{cc-pd-chart}} - for rendering a Pie or Doughnut charts.
      2.1.1 Attributes:
        2.1.2 isPie: Defines if the chart will be rendered as Pie or Doughnut.
        2.1.3 segmentShowStroke: Boolean - Whether we should show a stroke on each segment
        2.1.4 animateRotate: Boolean - Whether we animate the rotation of the chart
        2.1.5 animateScale: Boolean - Whether we animate scaling the chart from the centre
        2.1.6 legendTemplate: String - A legend template
  2.2 {{cc-bar-chart}} - for rendering a bar chart.
    2.2.1 scaleShowGridLines:
    2.2.2 barDatasetSpacing: Number - Spacing between data sets within X values
    2.2.3 legendTemplate: String - A legend template
  2.3 {{cc-line-chart}} - for rendering a line chart.
    2.3.1 scaleShowGridLines:
    2.3.2 pointDot: Boolean - Whether to show a dot for each point
    2.3.3 datasetFill: Boolean - Whether to fill the dataset with a colour
    2.3.4 legendTemplate String: - A legend template
  2.4 Across all components
    2.4.1 legend: Boolean- whether to display legend
    2.4.2 width: Number - width of the chart.
    2.4.3 height: Number - height of the chart.
    2.4.4 reRender: Boolean - wether to re render the chart. Returns to false upon re render. 
3. Functionality
  3.1 onClick: String - name of an action. Will run the method on the Segment/DataSet recieved.
                        The action must take 1 variable which is the Segment/DataSet. Example:
   clickPie: function (segment) {
    this.set('pClicked', ('Clicked ' + segment.label));
  }
  clickBar: function (bar) {
    this.set('bClicked', ('Clicked ' + bar.label));
  }
  
Example usages:
1.
{{cc-pd-chart data=cakeData isPie=isPie width=200 height=200 legend=false animateRotate=true segmentShowStroke=false animateScale=true reRender=reRender onClick="clickPie"}}
2.    
{{cc-bar-chart data=barData width=700 height=400 scaleShowGridLines=true barDatasetSpacing=4 reRender=reRender legend=true onClick="clickBar"}}
3.  
{{cc-line-chart data=lineData width=700 height=400 scaleShowGridLines=true pointDot=false datasetFill=false reRender=reRender legend=true onClick="clickLine"}}
    
    
    
    
