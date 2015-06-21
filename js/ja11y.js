var j = {};

function init () {
	if(!j) {
		j = {};
	}
	j.b = document.getElementsByTagName('body'),
	j.a = document.getElementsByTagName('a'),
	j.d = document.getElementsByTagName('div'),
	j.h = document.getElementsByTagName('header'),
	j.i = document.getElementsByTagName('img');

	/********************************************
		If the images on the page lack the alt attribute,
		give them a null alt attribute.  Ain't nobody got
		time for filename AT readout!
	*********************************************/
	for(var i=0; i<j.i.length; i++) {
		if(!j.i[i].getAttribute('alt')) {
			j.i[i].setAttribute('alt', '');
		}
	}

	/********************************************
		If the anchors are missing an href, they are not
		tabbable.  This sets the href value so they can be
		accessed via the keyboard.
	*********************************************/
	for(var i=0; i<j.a.length; i++) {
		if(!j.a[i].getAttribute('href')) {
			j.a[i].setAttribute('href', 'javascript: void(0);');
		}
	}

	window.onload = start();
}

j.id = function(id) {
	return document.getElementById(id);
}

j.getClass = function(c) {
	return document.querySelectorAll(c);
}

j.attr = function(id, attr, set) {
	var new_id = document.getElementById(id);
	var curAttrs = new_id.attributes;
	if(!attr && !set) {
		return curAttrs;
	} else if (attr) {
		new_id.setAttribute(attr,set);
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


/***************************************************************
	FORMS
***************************************************************/
j.form = function (f) {
	var form = document.getElementById(f.id),
			ele = f.fields;
	if(form) {
		//Loop through the object that was passed in and set up the element
		for (i in ele) {
			var curEl = document.createElement(ele[i].type),
				curLabel = document.createElement('label'),
				labelText = document.createTextNode(ele[i].label),
				type = ele[i].type;

			//Set Checkbox Groups
			if(i == 'group' || ele[i] == 'group') {
				var fieldset = document.createElement('fieldset'),
					legend = document.createElement('legend'),
					legendText = document.createTextNode(ele[i].legend),
					req = ele[i].required;
				if(req) {
					var reqText = document.createElement('span');
					reqText.className = 'offscreen-required';

				}
				legend.appendChild(legendText);
				fieldset.appendChild(legend);

				for (var a=0; a<ele[i].options.length; a++) {
					var info = ele[i].options[a],
						curEl = "",
						curLabel = "", labelText = "";
					curEl = document.createElement('input');
					curEl.setAttribute('type', info.type);
					curEl.setAttribute('id', info.id);
					curEl.setAttribute('name', info.name);	
					curLabel = document.createElement('label');
					curLabel.setAttribute('for', info.id);
					labelText = document.createTextNode(info.label);
					curLabel.appendChild(labelText);
					fieldset.appendChild(curLabel);
					fieldset.appendChild(curEl);	
				}

				form.appendChild(fieldset);
			} else if (i.toLowerCase() === 'submit' || i.toLowerCase() === 'cancel') {
				var curEl = document.createElement('input'),
					btnText = document.createTextNode(ele[i].text);
				curEl.value = ele[i].text;
				curEl.appendChild(btnText);
				curEl.setAttribute('type', 'button');

				if(ele[i].action) {
					curEl.setAttribute('onclick', ele[i].action);
					curEl.addEventListener('click', function() {
						ele[i].action;
					});
				} else {
					if(i.toLowerCase() === 'submit') {
						curEl.setAttribute('onclick', "j.form.submit('" + f.id + "');");
					} else if(i.toLowerCase() === 'cancel') {
						curEl.setAttribute('onclick', "j.form.clear('" + f.id + "');");
					}
					
				}
				
				if(ele[i].class) {
					curEl.className = ele[i].class;
				}

				form.appendChild(curEl);
			} else {
				//Set current form field attributes
				curEl.setAttribute('id', i);
				curEl.setAttribute('name', i);

				if(ele[i].class) {
					curEl.setAttribute('class', ele[i].class);
				}
				

				//If the element is required, set ARIA-attributes and get things ready for the error handling
				if(ele[i].required) {
					curEl.setAttribute('aria-required', 'true');
					curEl.setAttribute('data-err', ele[i].errorText);
					curEl.setAttribute('aria-invalid', 'false');
				}

				//Set Select Box Options
				if(type && type.toLowerCase() == 'select') {
					for(var k=0; k<ele[i].options.length; k++) {
						var op = document.createElement('option');
						op.text = ele[i].options[k].text;
						op.value = ele[i].options[k].value;
						curEl.add(op);
					}
				}

				//Set current form label
				curLabel.setAttribute('for', i);
				curLabel.appendChild(labelText);		

				form.appendChild(curLabel);
				form.appendChild(curEl);	
		
			}

		}
		j.form.applyLabels(f.id);
	}	
}

j.form.submit = function(id) {
	j.form.clearErrors(id);
		
	var form = document.forms[id].elements;
	for(var i=0; i<form.length; i++) {
		if(form[i].id) {
			if(form[i].value === "") {
				var d = document.getElementById(form[i].id),
					errorSpan = document.createElement('span'),
					errorText =  document.createTextNode(' ' + d.getAttribute('data-err'));
				errorSpan.appendChild(errorText);
				d.className = d.className + " error";
				d.label.appendChild(errorSpan);	
				form[i].setAttribute('aria-invalid', 'true');			
			}
		}
	}	
}

j.form.clearErrors = function(id) {
	var form = document.forms[id].elements;

	for(var i=0; i<form.length; i++) {
		if(form[i].id) {
			document.getElementById(form[i].id).className =
		    document.getElementById(form[i].id).className.replace(/\berror\b/,'');
			var label = form[i].label;
			if(label.childNodes[1]) {
				label.removeChild(label.childNodes[1]);
			}
			form[i].setAttribute('aria-invalid', 'false');		    
		}
	}		
}

j.form.clear = function(id) {
	j.form.clearErrors(id);
	var ele = document.getElementById(id).elements;
	for (var i=0; i<ele.length; i++) {
		var label = ele[i].label;
		if(label.childNodes[1]) {
			label.removeChild(label.childNodes[1]);
		}
		
		ele[i].value = "";
	}

}

j.form.applyLabels = function(id) {
	var labels = document.getElementsByTagName('LABEL');
	for (var i = 0; i < labels.length; i++) {
	    if (labels[i].htmlFor != '') {
	         var elem = document.getElementById(labels[i].htmlFor);
	         if (elem)
	            elem.label = labels[i];			
	    }
	}
}

j.form.addInput = function (f,id,l,options) {
	var form = document.getElementById(f);
	//If the user doesn't pass in an object of options
	if(id && l && !options) {
		var input = document.createElement('input'),
			label = document.createElement('label'),
			lText = document.createTextNode(l);
		input.setAttribute('id', id);
		input.setAttribute('class', 'shadow_inset rounded_corners');
		label.setAttribute('for', id);
		label.appendChild(lText);
	} else {

	}

	form.appendChild(label);
	form.appendChild(input);
}

j.form.addOptions = function (id,text,options) {
	var option = document.createElement('option');
	if(id && text && !options) {
		option.text = text;
		option.value = text;	
	} else {
		option.text = options.text;
		optionlvalue = options.value;
	}
	document.getElementById(id).add(option);	

}

/***************************************************************
	DRAWERS
***************************************************************/
j.drawer = function(obj) {
	var drawer = document.getElementById(obj.id);

	//Draw the header/anchors
	var drawerHead = document.querySelectorAll('.drawerHead'),
		drawerText = document.createTextNode(obj.header),
		drawerH2 = document.createElement('h2'),
		drawerContent = document.querySelectorAll('.drawerContent'),
		headLink = document.createElement('a'),
		headTextInd = document.createElement('span');
		headText = document.createTextNode('[+]'),
		offscreen = document.createElement('span'),
		offText = document.createTextNode(' Click to expand this drawer');


	offscreen.className = "offscreen";
	offscreen.appendChild(offText);
	drawerH2.appendChild(drawerText);
	headTextInd.appendChild(headText);
	headLink.appendChild(headTextInd);
	headLink.appendChild(offscreen);
	headLink.appendChild(drawerH2);
	headLink.setAttribute('href', 'javascript:void(0);');
	headLink.setAttribute('onclick', 'return false;');
	headLink.setAttribute('aria-haspopup', 'true');
	headLink.setAttribute('aria-expanded', 'false');
	for(var i=0; i<drawerContent.length; i++) {
		drawerContent[i].setAttribute('tabindex', '-1');
	}


	k = 0;
	if(drawer) {
		for (var k=0; k<drawer.children.length; k++) {
			if(drawer.children[k].className === "drawerHead") {
				drawer.children[k].appendChild(headLink);
				drawer.children[k].appendChild(drawerH2);
				headLink.addEventListener('click', function(e) {
					for(var l = 0; l<drawer.children.length; l++) {
						if(drawer.children[l].className == "drawerContent") {
							if(drawer.children[l].style.display == 'none' || drawer.children[l].style.display == "") {
								drawer.children[l].style.display = "block";
								drawer.children[l-1].children[0].children[0].innerText = "[-]";
								drawer.children[l-1].children[0].children[1].innerText = " Click to collapse this drawer";
								drawer.children[l-1].children[0].setAttribute('aria-expanded', 'true');
								drawer.children[l].focus();
							} else {
								drawer.children[l].style.display = "none";
								drawer.children[l-1].children[0].children[0].innerText = "[+]";
								drawer.children[l-1].children[0].children[1].innerText = " Click to expand this drawer";
								drawer.children[l-1].children[0].setAttribute('aria-expanded', 'false');
							}
						}
					}
		
				});						
			}
		}		
	}

}
/***************************************************************
	OVERLAY
***************************************************************/
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
/***************************************************************
	TABLES
***************************************************************/
j.dataTable = function(id,obj) {
	var table = document.getElementById(id),
		captionText = document.createTextNode(obj.caption),
		cols = obj.columnHeaders,
		rows = obj.rowData,
		thead = document.createElement('thead'),
		tbody = document.createElement('tbody'),
		dataCellText,
		caption = document.createElement('caption');
		caption.appendChild(captionText);
		table.appendChild(caption);
		if(!obj.captionShow) {
			caption.className = 'offscreen';
		}

		var tr = document.createElement('tr');
		for(var i=0; i<cols.length; i++) {
			var th = document.createElement('th'),
				thText = document.createTextNode(cols[i]);
			th.appendChild(thText);
			tr.appendChild(th);
		}
		thead.appendChild(tr);
		table.appendChild(thead);

		for(var cell in rows) {
			var tr1 = document.createElement('tr');
			for(var i=0; i<rows[cell].length; i++) {
				var td = document.createElement('td'),
					tdText = document.createTextNode(rows[cell][i]);
				td.appendChild(tdText);
				tr1.appendChild(td);

			}
			tbody.appendChild(tr1);
		}
		table.appendChild(tbody);
		table.className = 'dataTable';
}
