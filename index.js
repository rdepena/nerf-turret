var Emitter = require('events').EventEmitter,
    util = require('util'),
    io = require('socket.io-client'),
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
  options = options || {};
  var isRemote = false,
    turretHid,
    socket;

  this.left = writeToTurret(LEFT).bind(this);
  this.right = writeToTurret(RIGHT).bind(this);
  this.up = writeToTurret(UP).bind(this);
  this.down = writeToTurret(DOWN).bind(this);
  this. stop = writeToTurret(STOP).bind(this);
  this.fire = writeToTurret(FIRE).bind(this);
  var onReady = ready.bind(this),
  onSocketMessage = processSocketMessage.bind(this);

  if (options.socketServer){
    socket = io(options.socketServer);
    socket.on('connect', onReady);
    if (options.listening) {
      socket.on('nerf:turret:command', onSocketMessage);
    } else {
      isRemote = true;
    }
  }
  function processSocketMessage(data) {
      if(data.sourceId !== socket.id) {
        this[data.command.name]();
      }
  }
  function writeToTurret(command) {
    return function () {
      this.emit(command.name);
      if(isRemote) {
        socket.emit('nerf:turret:command', {
          command: command,
          sourceId: socket.id
        });
        return;
      }
      turretHid.write([0x02, command.val, 0x00,0x00,0x00,0x00,0x00,0x00]);
    };
  }
  function disconnect() {
    if (turretHid) {
        turretHid.close();
    }
    this.emit('disconnecting');
  }

  function ready() {
    console.log('I am ready');
    this.emit('ready');
  }
  function hidConnection() {
    var HID = require('node-hid');
    turretHid = new HID.HID(vendorId, productId);
    this.emit('ready');
  }
  //subscribe to the exit event:
  process.on('exit', disconnect.bind(this));
  if(!isRemote) {
    setTimeout(hidConnection.bind(this), 1);
  }
}

util.inherits(Turret, Emitter);

module.exports = {
  Turret:Turret
};

