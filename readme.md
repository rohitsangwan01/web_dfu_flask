# web bluetooth dfu Flask

This is a demo of Nordic's DFU protocols using [Web Bluetooth](https://webbluetoothcg.github.io/web-bluetooth/) standard to implement BLE firmware updates from the browser.

## Features

- Supports continuation of failed transfers and skipping of any init packet if already valid
- Supports [Buttonless DFU](http://infocenter.nordicsemi.com/index.jsp?topic=%2Fcom.nordic.infocenter.sdk5.v15.2.0%2Fble_sdk_app_buttonless_dfu.html) activation
- Uses ES6 syntax assuming that all JS engines supporting Web Bluetooth are also ES6 compatible

## Local testing

To test locally, fork repo and install flask
then simply run

python3 app.py

also change (delay = 10) in /static/secure-dfu.js accordingly , if firmware Transfer failed

On MS Windows, you can use Chrome after version 70.
On Linux, The chrome://flags/#enable-experimental-web-platform-features flag must be enabled. Also you have to install Bluez 5.41 and later. Ubuntu 16.10 or 18.10 has no problem with its own package. However, Ubuntu 16.04 comes with Bluez 5.37, thus you have to install from [source](http://www.kernel.org/pub/linux/bluetooth/). Then, you can restart the bluetooth service.

    sudo /etc/init.d/bluetooth start

## Credits

This source is based on [Web Bluetooth DFU](https://github.com/thegecko/web-bluetooth-dfu) by [thegecko](https://github.com/thegecko).
