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