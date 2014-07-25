j = {};

j.init = function () {
	var j = {};
	j.body = document.getElementsByTagName('body'),
	j.anchors = document.getElementsByTagName('a'),
	j.divs = document.getElementsByTagName('div'),
	j.headers = document.getElementsByTagName('header'),
	j.images = document.getElementsByTagName('img');

	/********************************************
		If the images on the page lack the alt attribute,
		give them a null alt attribute.  Ain't nobody got
		time for filename AT readout!
	*********************************************/
	for(var i=0; i<j.images.length; i++) {
		if(!j.images[i].getAttribute('alt')) {
			j.images[i].setAttribute('alt', '');
		}
	}

	/********************************************
		If the anchors are missing an href, they are not
		tabbable.  This sets the href value so they can be
		accessed via the keyboard.
	*********************************************/
	for(var i=0; i<j.anchors.length; i++) {
		if(!j.anchors[i].getAttribute('href')) {
			j.anchors[i].setAttribute('href', 'javascript: void(0);');
		}
	}

	window.onload = start();
}

j.id = function(id) {
	return document.getElementById(id);
}

j.class = function(c) {
	return document.querySelectorAll(c);
}

j.attr = function(id, attr, set) {
	var id = document.getElementById(id);
	var curAttrs = id.attributes;
	if(!attr && !set) {
		return curAttrs;
	} else if (attr) {
		id.setAttribute(attr,set);
	}
}

j.removeAttr = function(id, attr) {
	document.getElementById(id).removeAttribute(attr);
}

j.create = function(type, attr) {
	var el = document.createElement(type);
	if(attr) {
		for (var a in attr) {
			el.setAttribute(a, attr[a]);
		}
	}
	return el;
}

j.prev = function(id) {
	return j.id(id).previousSibling;
}

j.parent = function(id) {
	return j.id(id).parentNode;
}

j.css = function(id, attr, val) {
	var el = j.id(id);
	el.style[attr] = val;

	return el;
}