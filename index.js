/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-idx-charts',

  included: function( app ) {
  	app.import('bower_components/chartjs/Chart.js');
  }
};
