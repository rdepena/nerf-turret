> NodeJS nerf turret api

Compatible with the Dream Cheeky 908 model.
## Install

```sh
$ npm install --save nerf-turret
```


## Usage

```js
var nerfTurret = require('nerf-turret'),
  turret = new nerfTurret.Turret();

  turret.on('ready', function () {
    turret.left();
    setTimeout(turret.stop, 500);
    setTimeout(turret.fire, 500);
    //possible commands are:
    //turret.left();
    //turret.right();
    //turrent.up();
    //turret.down();
    //turret.stop();
    //turret.fire();
    
  });
  
  
```

[Office Turret Bot video](https://vimeo.com/122693852)



![Nerf Turret](http://a.tgcdn.net/images/products/zoom/8a0f_usb_rocket_launcher.jpg)


<iframe src="//player.vimeo.com/video/122693852" width="500" height="375" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>


## License

MIT © []()


[npm-image]: https://badge.fury.io/js/nerf-turret.svg
[npm-url]: https://npmjs.org/package/nerf-turret
[travis-image]: https://travis-ci.org/rdepena/nerf-turret.svg?branch=master
[travis-url]: https://travis-ci.org/rdepena/nerf-turret
[daviddm-image]: https://david-dm.org/rdepena/nerf-turret.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/rdepena/nerf-turret
