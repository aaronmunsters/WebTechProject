'use strict'

const DATE_FORMATER = require( 'dateformat' );


function jsDate_to_sqlDate(js_date) {
  return DATE_FORMATER( new Date(), "yyyy-mm-dd" );
};

module.exports = jsDate_to_sqlDate;