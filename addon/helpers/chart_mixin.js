import Ember from 'ember';
/* global Chart */

export default Ember.Mixin.create({
    tagName: 'canvas',
    attributeBindings: ['width', 'height'],
    data: undefined,
    reRender: false,
    onClick: undefined,

    colors: ["#3a87ad", "#d15b47", "#82af6f", "#fee188", "#f89406", "#9585bf","#d6487e"],
    highlights: ["#6fb3e0","LightCoral","LightGreen","LightYellow","LightSalmon","MediumPurple"],
    strokeColors: ["rgba(58,135,173,0.2)","rgba(209,91,71,0.2)", "rgba(130,175,111,0.2)", "rgba(254,255,136,0.2)", "rgba(248,148,6,0.2)", "rgba(149,133,191,0.2)", "rgba(214,72,126,0.2)"],

    renderChart: function(){
        var context = this.get('element').getContext('2d');
        var data = this.extractData();
        var type = this.get('type').classify();
        var options = Ember.merge({}, this.get('options'));

        var chart = new Chart(context)[type](data, options);

        if (this.get('legend')) {
            var legend = chart.generateLegend();
            this.$().parent().append(legend);
        }
        this.set('chart', chart);
    }.on('didInsertElement'),

    destroyChart: function(){
        if (this.get('legend')) {
            this.$().parent().children('[class$=legend]').remove();
        }
        this.get('chart').destroy();
    }.on('willDestroyElement'),

    reRenderChart: function(){
        if (this.get('reRender')) {
            this.destroyChart();
            this.renderChart();
        }
        this.set('reRender', false);
    }.observes('reRender')

});