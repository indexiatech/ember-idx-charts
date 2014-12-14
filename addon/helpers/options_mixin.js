import Ember from 'ember';

export default Ember.Mixin.create({

    responsive: undefined,

    // expects an array of string indicating names if properties
    // options = ["animation","hover"]
    buildOptions: function(options){
        var charOptions ={};
        for (var i=0; i<options.length; i++) {
            var cur=(options[i]);
            if (cur) { charOptions[cur] = this.get(cur); }
        }
        return charOptions;
    },
    updateOptions: function() {
        console.log('Updated Options');
    }.observes('options')

});