import Ember from 'ember';

export default Ember.Mixin.create({
    labels: [],

    /*
     Currently can add 1 label at a time.
      */
    updateChart: function() {
        try {
            var data = this.get('chart').datasets;
            var labels = this.get('labels');
            var newData = this.extractData();
            var amount = this.updateCurrentDataInChart(data, newData);
            amount===0 ? this.get('chart').update() : this.set('reRender', true);
            if (labels.length===newData.labels.length) { return; }
            labels.length>newData.labels.length ? this.set('reRender', true) : this.addData(newData.labels[newData.labels.length-1],newData.datasets);
        } catch(error) {
            Ember.warn('Error: ' + error +'. Rebuilding chart.');
            this.set('reRender', true);
        }
    }.observes('data'),

    /*
     @param datasets is the new datasets
     @param label is the label you want to add
     TODO: should be able to get an array of labels and add them.
     */
    addData: function(label, datasets) {
        var myData=[];
        for (var i=0; i<datasets.length; i++) {
            myData[i] = datasets[i].data[datasets[i].data.length-1];
        }
        this.get('chart').addData(myData, label);
    },

    // this should remove a whole dataset
    removeData: function() {
    },

    extractLabels: function(map) {
        var labels=[]; var i=0;
        for (var key in map) {
            if (map.hasOwnProperty(key)) {
                if (key.toUpperCase()!=='LABEL') {
                    labels[i] = key.toString();
                    i++;
                }
            }
        }
        return labels;
    }

});