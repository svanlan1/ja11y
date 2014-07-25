function start() {
	j.form({
		"id": "personalInfo",
		"fields": {
				'fName': {
					"type": "input",
					"required": true,
					"errorText": 'is a required field and cannot be blank',
					"class": "shadow_inset rounded_corners",
					"label": "First Name"
				},
				'lName': {
					"type": "input",
					"required": true,
					"errorText": 'is a required field and cannot be blank',
					"class": "shadow_inset rounded_corners",
					"label": "Last Name"
				},                                                            
				'state': {
					"type": "select",
					"required": true,
					"errorText": 'is required.  Please select a state.',
					"class": "shadow_inset rounded_corners",
					"label": "State",
					"options": [
						{
							'value': "",
							'text': ""
						},
						{
							'value': 'IL',
							'text': 'Illinois'
						}, 
						{
							'value': 'VA',
							'text': 'Virginia'
						},
						{ 
							'value': 'MD',
							'text': 'Maryland'
						},
						{
							'value': 'DC',
							'text': 'Washington D.C.'
						}
					]
				},
				'textarea1': {
					"type": "textarea",
					"required": true,
					"errorText": " is required.  Please add some text in here",
					"class": "shadow_inset rounded_corners",
					"label": "Comments"
				},
				'group': {
					"options": [
						{
							'type': 'radio',
							'id': 'check1',
							'label': 'Yes',
							"class": "shadow_inset rounded_corners",
							'name': 'continue',
						},
						{
							'type': 'radio',
							'id': 'check2',
							'label': 'No',
							"class": "shadow_inset rounded_corners",
							'name': 'continue'
						}
					],
					"legend": "Do you wish to continue?",
					"required": true
				},
				'submit': {
					'text': 'Submit',
					'class': 'css3button'
				},
				'cancel': {
					'text': 'Cancel',
					'class': 'css3button'
				}                      
		}

	});

	j.drawer({
		'id': 'drawer1',
		'header': 'Benefits'
	});

	j.drawer({
		'id': 'drawer2',
		'header': 'Markup'
	});

	j.drawer({'id': 'formDrawer', 'header': 'jA11y forms accessibility'});
	j.drawer({'id': 'tablesDrawer', 'header': 'jA11y Tables accessibility'});

	j.dataTable('dataTable', {
		'caption': 'Demo data table',
		'captionShow': true,
		'columnHeaders': ['Name', 'Address', 'Phone Number', 'City', 'State', 'Zip Code'],
		'rowData': {
			'1': ["Shea VanLaningham", "9543 Sundial Court", "(804)873-9778", "Henrico", "Virginia", "23294"],
			'2': ["Shea VanLaningham", "5421 W. Haymeadow Place", "(804)873-9778", "Peoria", "Illinois", "61615"]
			
		}
	});

	j.attr('fName', 'data-fuck', '500px');
}

function addOptions() {
	j.form.addOptions('state', 'Arkansas');
}

function addInput() {
	j.form.addInput('personalInfo', 'address', 'Address');
}

function showModalWindow() {
	j.overlay({
		"id": "overlay",
		"first": "closeBtn",
		"last": "lastAnchor",
		"close": "closeBtn",
		"focus": "head1",
		"label": j.id('head1'),
		"parent": ""
	});
}