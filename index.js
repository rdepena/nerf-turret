var Emitter = require('events').EventEmitter,
    util = require('util'),
    DOWN = {
      val:0x01,
      name:'down'
    },
    UP = {
      val:0x02,
      name:'up'
    },
    LEFT = {
      val:0x04,
      name: 'left'
    },
    RIGHT = {
      val:0x08,
      name: 'right'
    },
    FIRE = {
      val:0x10,
      name: 'fire'
    },
    STOP = {
      val:0x20,
      name: 'stop'
    },
    vendorId = 8483,
    productId = 4112;

function Turret(options) {
  'use strict';
  //Emitter.call(this);
  options = options || {};
  var turretHid;

  this.left = writeToTurret(LEFT).bind(this);
  this.right = writeToTurret(RIGHT).bind(this);
  this.up = writeToTurret(UP).bind(this);
  this.down = writeToTurret(DOWN).bind(this);
  this. stop = writeToTurret(STOP).bind(this);
  this.fire = writeToTurret(FIRE).bind(this);

  function writeToTurret(command) {
    return function () {
      this.emit(command.name);
      turretHid.write([0x02, command.val, 0x00,0x00,0x00,0x00,0x00,0x00]);
    };
  }
  function disconnect() {
    if (turretHid) {
        turretHid.close();
    }
    this.emit('disconnecting');
  }

  function hidConnection() {
    var HID = require('node-hid');
    turretHid = new HID.HID(vendorId, productId);
    this.emit('ready');
  }
  //subscribe to the exit event:
  process.on('exit', disconnect.bind(this));
  setTimeout(hidConnection.bind(this), 1);
}

util.inherits(Turret, Emitter);

module.exports = {
  Turret:Turret
};

