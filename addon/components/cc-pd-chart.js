import Ember from 'ember';
import Charts from 'ember-idx-charts/helpers/chart_mixin';
import Options from 'ember-idx-charts/helpers/options_mixin';

export default Ember.Component.extend(Charts, Options, {
    isPie: undefined,
    type: function(){
        if (this.get('isPie')) { return 'Pie'; }
        return 'Doughnut';
    }.property('isPie'),

    //Boolean - Whether we should show a stroke on each segment
    segmentShowStroke : true,

    //Boolean - Whether we animate the rotation of the Doughnut
    animateRotate : false,

    //Boolean - Whether we animate scaling the Doughnut from the centre
    animateScale : false,

    //String - A legend template
    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",

    options: function(){
        var myOptions = ['animateRotate','animateScale','legendTemplate', 'segmentShowStroke', 'responsive'];
        return this.buildOptions(myOptions);
    }.property('animateRotate', 'animateScale','legendTemplate', 'segmentShowStroke', 'responsive'),

    /*
       Expects data in a format of a map where:
       Wanted labels are the map's keys
       Wanted values are the map's values
    */
    extractData: function(){
        if (Object.prototype.toString.call(this.get('data')) === '[object Array]') { return this.get('data'); }
        var dataSet =[];
        var i=0;
        var colors = this.get('colors');
        var highlight = this.get('highlights');
        var map = this.get('data');
        for (var key in map) {
            if (map.hasOwnProperty(key)) {
                var dataObj = {};
                dataObj["label"] = key.toString();
                dataObj["highlight"] = highlight[i];
                dataObj["color"] = colors[i];
                dataObj["value"] = map[key];
                dataSet.push(dataObj);
                i++;
            }
        }
        return dataSet;
    },

    updateCurrentDataInChart: function(data, newData) {
        var minLength = Math.min(data.length, newData.length);
        for (var i=0; i<minLength; i++) {
            if (data[i].label!==newData[i].label) {this.get('chart').segments[i].label=newData[i].label;}
            if (data[i].value!==newData[i].value) {this.get('chart').segments[i].value=newData[i].value;}
            if (data[i].color!==newData[i].color) {this.get('chart').segments[i].color=newData[i].color;}
            if (data[i].highlight!==newData[i].highlight) {this.get('chart').segments[i].highlight=newData[i].highlight;}
        }
        return data.length-newData.length;
    },

    addSegments: function(howMany, index, data) {
        for (var i=0; i<howMany; i++) {
            this.get('chart').addData(data[index+i]);
        }
    },

    removeSegments: function(howMany) {
        for (var i=0; i<howMany; i++) {
            this.get('chart').removeData();
        }
    },

    updateChart: function() {
        try {
            var data = this.get('chart').segments;
            var newData = this.extractData();
            var amount = this.updateCurrentDataInChart(data, newData);
            if (amount===0) { this.get('chart').update(); return;}
            amount>0 ? this.removeSegments(amount) : this.addSegments(Math.abs(amount), data.length, newData);
        } catch(error) {
            Ember.warn('Error: ' + error +'. Rebuilding chart.');
            this.set('reRender', true);
        }
    }.observes('data'),

    updateOptions: function() {
        console.log('Updated Options');
    }.observes('options'),

    listenToClickEvents: (function() {
        var that = this;
        return this.get('element').onclick = function (evt) {
            that.sendAction('onClick', that.get('chart').getSegmentsAtEvent(evt)[0]);
        };
    }).on('didInsertElement')
});