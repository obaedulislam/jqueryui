$(document).ready(function(){

  $( "#draggable" ).draggable();
    $( "#droppable" ).droppable({
      drop: function( event, ui ) {
        $( this )
          .addClass( "ui-state-highlight" )
          .find( "p" )
            .html( "Dropped!" );
      }
  });
  /* Droppable End */
  
  $( ".column" ).sortable({
    connectWith: ".column",
    handle: ".portlet-header",
    cancel: ".portlet-toggle",
    placeholder: "portlet-placeholder ui-corner-all"
  });

  $( ".portlet" )
    .addClass( "ui-widget ui-widget-content ui-helper-clearfix ui-corner-all" )
    .find( ".portlet-header" )
      .addClass( "ui-widget-header ui-corner-all" )
      .prepend( "<span class='ui-icon ui-icon-minusthick portlet-toggle'></span>");

  $( ".portlet-toggle" ).on( "click", function() {
    var icon = $( this );
    icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
    icon.closest( ".portlet" ).find( ".portlet-content" ).toggle();
  });
  /* Sortable End */

  $( function() {
    var icons = {
      header: "iconClosed",    // custom icon class
      activeHeader: "iconOpen" // custom icon class
    };
    $( "#accordion" ).accordion({
      icons: icons
    });
    $( "#toggle" ).button().on( "click", function() {
      if ( $( "#accordion" ).accordion( "option", "icons" ) ) {
        $( "#accordion" ).accordion( "option", "icons", null );
      } else {
        $( "#accordion" ).accordion( "option", "icons", icons );
      }
    });
  } );
  /* Accordion End */

  $( function() {
    function log( message ) {
      $( "<div/>" ).text( message ).prependTo( "#log" );
      $( "#log" ).attr( "scrollTop", 0 );
    }
 
    $.ajax({
      url: "../xml/london.xml",
      dataType: "xml",
      success: function( xmlResponse ) {
        var data = $( "geoname", xmlResponse ).map(function() {
          return {
            value: $( "name", this ).text() + ", " +
              ( $.trim( $( "countryName", this ).text() ) || "(unknown country)" ),
            id: $( "geonameId", this ).text()
          };
        }).get();
        $( "#birds" ).autocomplete({
          source: data,
          minLength: 0,
          select: function( event, ui ) {
            log( ui.item ?
              "Selected: " + ui.item.value + ", geonameId: " + ui.item.id :
              "Nothing selected, input was " + this.value );
          }
        });
      }
    });
  } );
    /* Autocomplete End */

    $( function() {
      $( ".controlgroup" ).controlgroup()
      $( ".controlgroup-vertical" ).controlgroup({
        "direction": "vertical"
      });
    } );
    /* Controlgroup End */
    
    $( function() {
      $( "#datepicker" ).datepicker( $.datepicker.regional[ "fr" ] );
      $( "#locale" ).on( "change", function() {
        $( "#datepicker" ).datepicker( "option",
          $.datepicker.regional[ $( this ).val() ] );
      });
    } );
    /* Date Picker End */

    $( function() {
      $( "#dialog-message" ).dialog({
        modal: true,
        buttons: {
          Ok: function() {
            $( this ).dialog( "close" );
          }
        }
      });
    });
    /* Dialog End */

    $( function() {
      $( "#menu" ).menu();
    } );
    /* Menu End */

    $( function() {
      var progressTimer,
        progressbar = $( "#progressbar" ),
        progressLabel = $( ".progress-label" ),
        dialogButtons = [{
          text: "Cancel Download",
          click: closeDownload
        }],
        dialog = $( "#dialog" ).dialog({
          autoOpen: false,
          closeOnEscape: false,
          resizable: false,
          buttons: dialogButtons,
          open: function() {
            progressTimer = setTimeout( progress, 2000 );
          },
          beforeClose: function() {
            downloadButton.button( "option", {
              disabled: false,
              label: "Start Download"
            });
          }
        }),
        downloadButton = $( "#downloadButton" )
          .button()
          .on( "click", function() {
            $( this ).button( "option", {
              disabled: true,
              label: "Downloading..."
            });
            dialog.dialog( "open" );
          });
   
      progressbar.progressbar({
        value: false,
        change: function() {
          progressLabel.text( "Current Progress: " + progressbar.progressbar( "value" ) + "%" );
        },
        complete: function() {
          progressLabel.text( "Complete!" );
          dialog.dialog( "option", "buttons", [{
            text: "Close",
            click: closeDownload
          }]);
          $(".ui-dialog button").last().trigger( "focus" );
        }
      });
   
      function progress() {
        var val = progressbar.progressbar( "value" ) || 0;
   
        progressbar.progressbar( "value", val + Math.floor( Math.random() * 3 ) );
   
        if ( val <= 99 ) {
          progressTimer = setTimeout( progress, 50 );
        }
      }
   
      function closeDownload() {
        clearTimeout( progressTimer );
        dialog
          .dialog( "option", "buttons", dialogButtons )
          .dialog( "close" );
        progressbar.progressbar( "value", false );
        progressLabel
          .text( "Starting download..." );
        downloadButton.trigger( "focus" );
      }
    } );
    /* Progress Bar End */

    $( function() {
      $( "#slider-range" ).slider({
        orientation: "vertical",
        range: true,
        values: [ 17, 67 ],
        slide: function( event, ui ) {
          $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
        }
      });
      $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
        " - $" + $( "#slider-range" ).slider( "values", 1 ) );
    } );
    /* Slider End */

    $( function() {
      var circle = $( "#circle" );
   
      $( "#radius" ).selectmenu({
        change: function( event, data ) {
          circle.css({
            width: data.item.value,
            height: data.item.value
          });
        }
       });
   
      $( "#color" ).selectmenu({
         change: function( event, data ) {
           circle.css( "background", data.item.value );
         }
       });
    } );
    /* Select Menu End */

    $( function() {
      $( "#tabs" ).tabs();
    } );
    /* Tabs End */

    $( function() {
      var state = true;
      $( "#button" ).on( "click", function() {
        if ( state ) {
          $( "#effect" ).animate({
            backgroundColor: "#4c4b5e",
            color: "#fff",
            width: 500
          }, 1000 );
        } else {
          $( "#effect" ).animate({
            backgroundColor: "#fff",
            color: "#000",
            width: 240
          }, 1000 );
        }
        state = !state;
      });
    } );
    /* Color Animation End */

    $( function() {
      if ( !$( "<canvas>" )[0].getContext ) {
        $( "<div>" ).text(
          "Your browser doesn't support canvas, which is required for this demo."
        ).appendTo( "#graphs" );
        return;
      }
   
      var i = 0,
        width = 100,
        height = 100;
   
      $.each( $.easing, function( name, impl ) {
        var graph = $( "<div>" ).addClass( "graph" ).appendTo( "#graphs" ),
          text = $( "<div>" ).text( ++i + ". " + name ).appendTo( graph ),
          wrap = $( "<div>" ).appendTo( graph ).css( 'overflow', 'hidden' ),
          canvas = $( "<canvas>" ).appendTo( wrap )[ 0 ];
   
        canvas.width = width;
        canvas.height = height;
        var drawHeight = height * 0.8,
          cradius = 10;
          ctx = canvas.getContext( "2d" );
        ctx.fillStyle = "black";
   
        // Draw background
        ctx.beginPath();
        ctx.moveTo( cradius, 0 );
        ctx.quadraticCurveTo( 0, 0, 0, cradius );
        ctx.lineTo( 0, height - cradius );
        ctx.quadraticCurveTo( 0, height, cradius, height );
        ctx.lineTo( width - cradius, height );
        ctx.quadraticCurveTo( width, height, width, height - cradius );
        ctx.lineTo( width, 0 );
        ctx.lineTo( cradius, 0 );
        ctx.fill();
   
        // Draw bottom line
        ctx.strokeStyle = "#555";
        ctx.beginPath();
        ctx.moveTo( width * 0.1, drawHeight + .5 );
        ctx.lineTo( width * 0.9, drawHeight + .5 );
        ctx.stroke();
   
        // Draw top line
        ctx.strokeStyle = "#555";
        ctx.beginPath();
        ctx.moveTo( width * 0.1, drawHeight * .3 - .5 );
        ctx.lineTo( width * 0.9, drawHeight * .3 - .5 );
        ctx.stroke();
   
        // Plot easing
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.moveTo( width * 0.1, drawHeight );
        $.each( new Array( width ), function( position ) {
          var state = position / width,
            val = impl( state, position, 0, 1, width );
          ctx.lineTo( position * 0.8 + width * 0.1,
            drawHeight - drawHeight * val * 0.7 );
        });
        ctx.stroke();
   
        // Animate on click
        graph.on( "click", function() {
          wrap
            .animate( { height: "hide" }, 2000, name )
            .delay( 800 )
            .animate( { height: "show" }, 2000, name );
        });
   
        graph.width( width ).height( height + text.height() + 10 );
      });
    } );
    /* Easing End */

    $( function() {
      function position() {
        $( ".positionable" ).position({
          of: $( "#parent" ),
          my: $( "#my_horizontal" ).val() + " " + $( "#my_vertical" ).val(),
          at: $( "#at_horizontal" ).val() + " " + $( "#at_vertical" ).val(),
          collision: $( "#collision_horizontal" ).val() + " " + $( "#collision_vertical" ).val()
        });
      }
   
      $( ".positionable" ).css( "opacity", 0.5 );
   
      $( "select, input" ).on( "click keyup change", position );
   
      $( "#parent" ).draggable({
        drag: position
      });
   
      position();
    } );
   



});
