MoLIC-Designer-Desktop
======================

Cross-platform desktop version of MoLIC Designer. This is a tool version intended for local execution.

You can check the main web version of this code [here](https://github.com/luicaps/MoLIC-Designer).

# What is MoLIC?

Curious about this tool and its potential? Read more about what MoLIC is and how to use it [here](http://www-di.inf.puc-rio.br/~simone/publications/07_12_silva.pdf).

## Frameworks in use

### Node Webkit

To reuse the web code and benefit from various web libraries, I chose to use this framework to run a web application in the desktop.
Check more about Node Webkit [here](https://github.com/rogerwang/node-webkit).

### Draw2D Touch

This library makes graph and diagrams easy to implement. I've been wandering around JointJS, but I managed to create the full tool with the Draw2D community version, allowing also to make my code open source with the GPL license.

Check more about Draw2D Touch [here](http://www.draw2d.org/draw2d/).

## Others

Any other library in use is just a recommendation from the main libraries presented.

## TODO

* Implement menubar actions
* Implement keyboard shortcuts for menubar and Draw2D
* First release