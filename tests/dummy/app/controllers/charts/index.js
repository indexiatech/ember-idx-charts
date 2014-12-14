import Em from 'ember';

export default Em.ObjectController.extend({
    redValue: 300,
    greenValue: 100,
    blueValue: 50,
    segmentShowStroke : false,
    animateRotate : false,
    animateScale : false,
    extraData1: 0,
    isPie: false,

    reRender:false,

    cakeData: function() {
        var data = {blue: Number(this.get('blueValue')), red: Number(this.get('redValue')), green: Number(this.get('greenValue'))};
        if (this.get('extraData1')>0) {data.extraData=Number(this.get('extraData1'));}
        return data;
    }.property('redValue', 'greenValue', 'blueValue','extraData1'),

    jan: 6528,
    feb: 5948,
    mar: 8040,
    apr: 8119,
    may: 5686,
    jun: 5527,
    jul: 4090,
    aug:0,
    label1:'DEFINED',
    label2:'COMPLETED',

    scaleShowGridLines: true,
    barDatasetSpacing : 1,

    barData: function(){
        var dataset1 = {January: Number(this.get('jan')/100), February: Number(this.get('feb')/100), March: Number(this.get('mar')/100),
            April:Number(this.get('apr')/100), May:Number(this.get('may')/100), June:Number(this.get('jun')/100), July:Number(this.get('jul')/100),
            label: this.get('label1')};
        var dataset2 = {January: Number(this.get('jan')%100), February: Number(this.get('feb')%100), March: Number(this.get('mar')%100),
            April:Number(this.get('apr')%100), May:Number(this.get('may')%100), June:Number(this.get('jun')%100), July:Number(this.get('jul')%100),
            label: this.get('label2')};
        if (this.get('aug')>0) {
            dataset1.August=Number(this.get('aug')/100);
            dataset2.August=Number(this.get('aug')%100);
        }
        return [dataset1,dataset2];
    }.property('jan','feb','mar','apr','may','jun','jul','aug', 'label1', 'label2'),

    janline: 6528,
    febline: 5948,
    marline: 8040,
    aprline: 8119,
    mayline: 5686,
    junline: 5527,
    julline: 4090,
    augline:0,
    label3:'DEFINED',
    label4:'COMPLETED',

    scaleShowGridLinesline: true,
    pointDot : true,
    datasetFill : true,

    lineData: function(){
        var dataset1 = {January: Number(this.get('janline')/100), February: Number(this.get('febline')/100), March: Number(this.get('marline')/100),
            April:Number(this.get('aprline')/100), May:Number(this.get('mayline')/100), June:Number(this.get('junline')/100), July:Number(this.get('julline')/100),
            label: this.get('label3')};
        var dataset2 = {January: Number(this.get('janline')%100), February: Number(this.get('febline')%100), March: Number(this.get('marline')%100),
            April:Number(this.get('aprline')%100), May:Number(this.get('mayline')%100), June:Number(this.get('junline')%100), July:Number(this.get('julline')%100),
            label: this.get('label4')};
        if (this.get('augline')>0) {
            dataset1.August=Number(this.get('augline')/100);
            dataset2.August=Number(this.get('augline')%100);
        }
        return [dataset1,dataset2];
    }.property('janline','febline','marline','aprline','mayline','junline','julline','augline', 'label1', 'label2'),

    pClicked: '',
    bClicked: '',
    lClicked: '',

    actions: {
        clickPie: function (segment) {
            this.set('pClicked', ('Clicked ' + segment.label));
        },

        clickBar: function (bar) {
            this.set('bClicked', ('Clicked ' + bar.label));
        },

        clickLine: function (line) {
            this.set('lClicked', ('Clicked ' + line.label));
        },

        rerender: function(){
            this.set('reRender', true);
        }
    }
});
