import Ember from 'ember';
import Charts from 'ember-idx-charts/helpers/chart_mixin';
import Options from 'ember-idx-charts/helpers/options_mixin';
import BR from 'ember-idx-charts/helpers/bar_line_mixin';

export default Ember.Component.extend(Charts, Options, BR, {
    type: 'Line',

    ///Boolean - Whether grid lines are shown across the chart
    scaleShowGridLines : true,

    //Boolean - Whether to show a dot for each point
    pointDot : true,

    //Boolean - Whether to fill the dataset with a colour
    datasetFill : true,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",

    options: function(){
        var myOptions = ['scaleShowGridLines','pointDot', 'datasetFill'];
        return this.buildOptions(myOptions);
    }.property('scaleShowGridLines','pointDot', 'datasetFill','legendTemplate'),

    /*
     Expects data in a format of a map array where:
     Wanted labels are the maps' keys. Should all be the same across maps.
     Wanted values are the maps' values
     */
    extractData: function(){
        if (Object.prototype.toString.call(this.get('data')) !== '[object Array]') { return this.get('data'); }
        var dataSets =[];
        var highlight = this.get('highlights');
        var colors = this.get('strokeColors');
        var maps = this.get('data');
        var labels = this.extractLabels(maps[0]);
        for (var j=0;j<maps.length;j++) {
            var map = maps[j];
            var dataObj = {data:[]};
            dataObj["fillColor"] = colors[j];
            dataObj["pointStrokeColor"] = "#fff";
            dataObj["pointHighlightFill"] = "#fff";
            dataObj["strokeColor"] = highlight[j];
            dataObj["pointColor"] = highlight[j];
            dataObj["pointHighlightStroke"] = highlight[j];
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    if (key.toUpperCase()==='LABEL') {dataObj['label']=map[key];}
                    else {
                        var i=labels.indexOf(key.toString());
                        dataObj["data"][i] = map[key];
                    }
                }
            }
            dataSets.push(dataObj);
        }
        this.set('labels', labels);
        return {labels: labels, datasets: dataSets};
    },

    /*
     @param datasets This is the datasets of current data
     @param newData is an object containing an array of labels and array of datasets
     @param labels is an array of current labels
     TODO: should support updating colors and actions
     */
    updateCurrentDataInChart: function(datasets, newData) {
        var newDatasets = newData.datasets;
        var minLength = Math.min(datasets.length, newDatasets.length);
        for (var i=0; i<minLength;i++) {
            for (var j=0;j<datasets[i].points.length;j++) {
                if (datasets[i].points[j].value!==newDatasets[i].data[j]) {
                    this.get('chart').datasets[i].points[j].value=newDatasets[i].data[j];
                }
            }
            if(datasets[i].label!==newDatasets[i].label) {this.get('chart').datasets[i].label=newDatasets[i].label;}
        }
        return datasets.length-newDatasets.length;
    },

    listenToClickEvents: (function() {
        var that = this;
        return this.get('element').onclick = function (evt) {
            that.sendAction('onClick', that.get('chart').getPointsAtEvent(evt)[0]);
        };
    }).on('didInsertElement')

});