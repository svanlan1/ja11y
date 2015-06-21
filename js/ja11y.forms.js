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
				curEl.setAttribute('id', ele[i].id);
				curEl.setAttribute('name', ele[i].id);

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

j.drawer = function (d) {
	var drawer = document.getElementById(d);
}