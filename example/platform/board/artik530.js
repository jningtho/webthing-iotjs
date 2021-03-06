// -*- mode: js; js-indent-level:2;  -*-
// SPDX-License-Identifier: MPL-2.0

/**
 *
 * Copyright 2018-present Samsung Electronics France SAS, and other contributors
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.*
 */
var webthing;

try {
  webthing = require('../../../webthing');
} catch (err) {
  webthing = require('webthing-iotjs');
}

var Thing = webthing.Thing;

var AdcProperty = require('../adc/adc-property');

var GpioProperty = require('../gpio/gpio-property');

function ARTIK530Thing(name, type, description) {
  var _this = this;

  var self = this;
  Thing.call(this, name || 'ARTIK530', type || [], description || 'A web connected ARTIK530 or ARTIK720');
  {
    this.pinProperties = [new GpioProperty(this, 'RedLED', false, {
      description: 'Red LED on interposer board (on GPIO28)'
    }, {
      direction: 'out',
      pin: 28
    }), new GpioProperty(this, 'BlueLED', false, {
      description: 'Blue LED on interposer board (on GPIO38)'
    }, {
      direction: 'out',
      pin: 38
    }), new GpioProperty(this, 'Up', true, {
      description: 'SW403 Button: Nearest board edge,\
 next to red LED (on GPIO30)'
    }, {
      direction: 'in',
      pin: 30
    }), new GpioProperty(this, 'Down', true, {
      description: 'SW404 Button: Next to blue LED (on GPIO32)'
    }, {
      direction: 'in',
      pin: 32
    }), new AdcProperty(this, 'ADC0', 0, {
      description: 'Analog port of ARTIK05x'
    }, {
      direction: 'in',
      device: '/sys/bus/platform/devices\
/c0053000.adc/iio:device0/in_voltage0_raw'
    }), new AdcProperty(this, 'ADC1', 0, {
      description: 'Analog port of ARTIK05x'
    }, {
      direction: 'in',
      device: '/sys/bus/platform/devices/\
c0053000.adc/iio:device0/in_voltage1_raw'
    })];
    this.pinProperties.forEach(function (property) {
      self.addProperty(property);
    });
  }

  this.close = function () {
    _this.pinProperties.forEach(function (property) {
      property.close && property.close();
    });
  };

  return this;
}

module.exports = function () {
  if (!module.exports.instance) {
    module.exports.instance = new ARTIK530Thing();
  }

  return module.exports.instance;
};