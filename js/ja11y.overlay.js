curFocus = "";
j.overlay = function(obj) {
	var el = j.id(obj.id),
		curFocus = document.activeElement,
		f = document.getElementById(obj.first),
		l = document.getElementById(obj.last),
		closeBtn = document.getElementById(obj.close),
		label = obj.label,
		c = el.parentNode;
		el.style.visibility = "visible";

	//Set the focus of the specified element
	if(obj.focus) {
		if(!j.id(obj.focus).getAttribute('tabindex')) {
			j.id(obj.focus).setAttribute('tabindex', '-1');
		}
		document.getElementById(obj.focus).focus();
	}
	
	//Set the event handlers for mouse and keyboard
	j.overlay.setEvents(el,f,l,closeBtn,c);

	//Set all appropriate ARIA attributes on the overlay and
	el.setAttribute('role', 'dialog');
	el.setAttribute('aria-hidden', 'false');
	if(typeof label == 'string') {
		el.setAttribute('aria-labelledby', label);
	} else {
		el.setAttribute('aria-labelledby', label.id);
	}

	//Check first and last elements to make sure they have a tabindex
	if(!f.getAttribute('tabindex')) {
		f.setAttribute('tabindex', '0');
	}

	if(!l.getAttribute('tabindex')) {
		l.setAttribute('tabindex', '0');
	}

}

j.overlay.setEvents = function(el,f,l,c,con) {
	
	el.addEventListener('keydown', function(e) {
		if(e.keyCode === 27) {
			el.style.visibility = "hidden";
			el.setAttribute('aria-hidden', 'true');
			con.setAttribute('aria-hidden', 'false');
			curFocus.focus();
		}
	});

	c.addEventListener('click', function() {
		el.style.visibility = "hidden";
		el.setAttribute('aria-hidden', 'true');
		con.setAttribute('aria-hidden', 'false');
		curFocus.focus();
	});

	f.addEventListener('keydown', function(e) {
		if(e.keyCode === 9) {
			if(e.shiftKey) {
				e.preventDefault();
				l.focus();
			}
		}
	});

	l.addEventListener('keydown', function(e) {
		if(e.keyCode === 9 && !e.shiftKey) {
			e.preventDefault();
			f.focus();
		}
	});
}