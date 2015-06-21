(function (jQuery) {
  
  var grid;
  var el, offsetBefore, offsetAfter, dragged;
  
  var drag = function(handle, dx, dy) {
    offsetBefore = el.offset();
    jQuery(handle).simulate("drag", {
      dx: dx || 0,
      dy: dy || 0
    });
    dragged = { dx: dx, dy: dy };
    offsetAfter = el.offset();
  }
  
  var moved = function (dx, dy, msg) {
    msg = msg ? msg + "." : "";
    var actual = { left: offsetAfter.left, top: offsetAfter.top };
    var expected = { left: offsetBefore.left + dx, top: offsetBefore.top + dy };
    same(actual, expected, 'dragged[' + dragged.dx + ', ' + dragged.dy + '] ' + msg);
  }
  
  var ROWS = 500, COLS = 10;
  var data = [], row;
  for (var i = 0; i < ROWS; i++) {
    row = { id: "id_" + i };
    for (var j = 0; j < COLS; j++) {
      row["col_" + j] = i + "." + j;
    }
    data.push(row);
  }
  
  var cols = [], col;
  for (var i = 0; i < COLS; i++) {
    cols.push({
      id: "col" + i,
      field: "col_" + i,
      name: "col_" + i
    });
  }
  
  cols[0].minWidth = 70;

  grid = new Slick.Grid("#container", data, cols);
  grid.render();

  module("grid - column resizing");
  
  test("minWidth is respected", function () {
    var firstCol = jQuery("#container .slick-header-column:first");
    firstCol.find(".slick-resizable-handle:first").simulate("drag", { dx: 100,  dy: 0 });
    firstCol.find(".slick-resizable-handle:first").simulate("drag", { dx: -200, dy: 0 });
    equal(firstCol.outerWidth(), 70, "width set to minWidth");
  });
  
  test("onColumnsResized is fired on column resize", function () {
    expect(2);
    grid.onColumnsResized.subscribe(function() { ok(true,"onColumnsResized called") });
    var oldWidth = cols[0].width;
    jQuery("#container .slick-resizable-handle:first").simulate("drag", { dx: 100, dy: 0 });
    equal(cols[0].width, oldWidth+100-1, "columns array is updated");
  });
  
  test("getData should return data", function () {
    equal(grid.getData(), data);
  });

  /**********************************************************************************************************
    Set up the grid initially.  The ID of the grid must be changed, and the role=grid will then be appended
  ***********************************************************************************************************/
  jQuery('#container').attr('role', 'grid');
  setAriaAttributes();

  /**********************************************************************************************************
    Both 'grid.onScroll' and 'grid.onSort' must be called in order for the accessibility fixes to go in.
    Call the 'setAriaAttributes' method to append the proper roles
  ***********************************************************************************************************/
  grid.onScroll.subscribe(function(e) {
    grid.invalidate();
    grid.render();
    setAriaAttributes();

  });

  grid.onSort.subscribe(function(e) {
    grid.invalidate();
    grid.render();
    setAriaAttributes();
  });  
  
})(jQuery);


  /**********************************************************************************************************
    This is where the cells get their roles and the 'aria-labelledby' for each cell.  The column headers and
    rows will also get their proper attributes
  ***********************************************************************************************************/
function setAriaAttributes() {
  var gridCells = jQuery('.slick-row .slick-cell'),
    cols = jQuery('.slick-header-columns .slick-header-column'),
    headers = [];

  //Set up the headers array.  We will pull the ID's from this later
  jQuery.each(cols, function( i, el) {
    headers.push(jQuery(el).attr('id'));
  });

  //Assign the tabindex, role=gridcell, and the aria-labelledby to be the #id of the columnheader
  jQuery.each( gridCells, function( i, el ) {
    var k = jQuery(el).index();
    jQuery(el).attr('tabindex', '-1').attr('role', 'gridcell').attr('aria-labelledby', headers[k]);
  });

  jQuery('.slick-row').attr('tabindex', '-1').attr('role', 'row');
  jQuery('.slick-header-column').attr('role', 'columnheader');
}