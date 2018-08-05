  // Build Board
  function buildBoard(IMAGES) {
    // Max values used to dynamically build Board
    const MAX_ROWS = 3;
    const MAX_HOLES_PER_ROW = 4;

    var gameBoard = $('#gameBoard');
    var currentHole = 0;
    // Build Rows
    for (var rows = 0; rows < MAX_ROWS; rows++) {
      var row = $('<div>').attr('class', 'row');
      // Build Holes
      for (var holes = 0; holes < MAX_HOLES_PER_ROW; holes++) {
        row.append(
          $('<div>')
          .attr('id', `hole_${currentHole}`)
          .attr('class', 'col-lg-3')
          .append(
            $('<img>')
            .attr('id', `hole_img_${currentHole++}`)
            .attr('src', 'img/default.png')
            .attr('class', 'rounded-circle')
            .attr('alt', 'Hole')
            .click((e) => {
              // Check to ensure we have time on the clock
              var time = parseInt($('#time').html());
              if (time > 0 && time < 60) {
                // Check to see if User clicked on valid image
                if (! $(`#${e.target.id}`).attr('src').includes('default')) {
                  // Add point
                  incrementScore();
                }
              }
            })
          )
        );
      }
      gameBoard.append(row);
    }
  }