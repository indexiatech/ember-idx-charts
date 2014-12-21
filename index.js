/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-idx-charts',

  included: function( app ) {
  	app.import('vendor/Chart.js');
  }
};
