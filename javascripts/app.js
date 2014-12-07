"use strict";

var app = angular.module('draw2dApp', ["draw2d", 'ui.bootstrap']);

var gui = require('nw.gui');

// Get the current window
var win = gui.Window.get();

// Create a menubar for window menu
var menu = new gui.Menu({ type: 'menubar' });

// File menu
var file = new gui.Menu();

//Save
file.append(new gui.MenuItem({
	icon: 'images/save.png',
	label: 'Salvar',
	click: function(){
		console.log('save!');
	}
}));

//Save as
var saveas = new gui.Menu({ type: 'menubar' });
//Save as image
saveas.append(new gui.MenuItem({
	label: 'Image (.png)',
	click: function(){
		console.log('Save as png!');
	}
}));

file.append(new gui.MenuItem({ label: 'Salvar como...', submenu: saveas }));

file.append(new gui.MenuItem({ type: 'separator' }));

//Print
file.append(new gui.MenuItem({
	label: 'Imprimir',
	click: function(){
		console.log('Print!');
	}
}));

file.append(new gui.MenuItem({ type: 'separator' }));

//Close
file.append(new gui.MenuItem({
	label: 'Sair',
	click: function(){
		win.close(true);
	}
}));

// Edit menu
var edit = new gui.Menu();

//Undo
edit.append(new gui.MenuItem({
	icon: 'images/undo.png',
	label: 'Desfazer',
	click: function(){
		console.log('Undo!');
	}
}));

//Redo
edit.append(new gui.MenuItem({
	icon: 'images/redo.png',
	label: 'Refazer',
	click: function(){
		console.log('Redo!');
	}
}));

edit.append(new gui.MenuItem({ type: 'separator' }));

//Zoom in
edit.append(new gui.MenuItem({
	icon: 'images/zoom_in.png',
	label: 'Aproximar',
	click: function(){
		console.log('Zoom in!');
	}
}));

//Zoom out
edit.append(new gui.MenuItem({
	icon: 'images/zoom_out.png',
	label: 'Afastar',
	click: function(){
		console.log('Zoom out!');
	}
}));

edit.append(new gui.MenuItem({ type: 'separator' }));

//Cut
edit.append(new gui.MenuItem({
	icon: 'images/cut.png',
	label: 'Recortar',
	click: function(){
		console.log('Cut!');
	}
}));

//Copy
edit.append(new gui.MenuItem({
	icon: 'images/copy.png',
	label: 'Copiar',
	click: function(){
		console.log('Copy!');
	}
}));

//Paste
edit.append(new gui.MenuItem({
	icon: 'images/paste.png',
	label: 'Colar',
	click: function(){
		console.log('Paste!');
	}
}));

edit.append(new gui.MenuItem({ type: 'separator' }));

//To front
edit.append(new gui.MenuItem({
	icon: 'images/to_front.png',
	label: 'Trazer para frente',
	click: function(){
		console.log('To front!');
	}
}));

//To back
edit.append(new gui.MenuItem({
	icon: 'images/to_back.png',
	label: 'Levar para trás',
	click: function(){
		console.log('To back!');
	}
}));

edit.append(new gui.MenuItem({ type: 'separator' }));

//Clear canvas
edit.append(new gui.MenuItem({
	icon: 'images/clean.png',
	label: 'Limpar prancheta',
	click: function(){
		console.log('Clear canvas!');
	}
}));

// Help menu
var help = new gui.Menu();

//About
help.append(new gui.MenuItem({
	label: 'Sobre',
	click: function(){
		console.log('About!');
	}
}));


// You can have submenu!
menu.append(new gui.MenuItem({ label: 'Arquivo', submenu: file}));
menu.append(new gui.MenuItem({ label: 'Editar', submenu: edit}));
menu.append(new gui.MenuItem({ label: 'Ajuda', submenu: help}));

//assign the menubar to window menu
win.menu = menu;

// add a click event to an existing menuItem
menu.items[0].click = function() { 
    console.log("CLICK"); 
};