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