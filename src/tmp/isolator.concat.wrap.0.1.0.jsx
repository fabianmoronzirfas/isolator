(function(thisObj) {

/*! isolator.jsx - v0.1.0 - 2014-08-08 */
// basic panelrun(thisObj);function run(thisObj) {  // this is global  data = {    "refreshing":false,    "layerlist": [],    "selectedLayer": {      "index": 0    }  };  ///   THIS WILL CHECK IF PANEL IS DOCKABLE OR FLAOTING WINDOW  var win = buildUI(thisObj);  if ((win !== null) && (win instanceof Window)) {    win.center();    win.show();  } // end if win  null and not a instance of window  function buildUI(thisObj) {    var win = (thisObj instanceof Panel) ? thisObj : new Window('palette', 'PANEL LABEL', [0, 0, 150, 260], {      resizeable: true,      name: "aPanel"    });    if (win !== null) {      var H = 25; // the height      var W = 30; // the width      var G = 5; // the gutter      var x = G;      var y = G;      // win.command_id_etext = win.add('edittet', [x, y, x + W * 3, y + H], 8000);      // win.check_box = win.add('checkbox',[x,y,x+W*2,y + H],'check');      // win.check_box.value = metaObject.setting1;      win.refresh = win.add('button', [x, y, x + W * 3, y + H], 'refresh');      x = x + W*3 + G;      win.reset = win.add('button', [x, y, x + W * 3, y + H], 'reset');      // win.up_button = win.add('button', [x + W*5+ G,y,x + W*6,y + H], 'Up');      x = G;      y+=H + G;      win.ddlist = win.add('dropdownlist', [x, y, x + W * 6 + G, y + H], data.layerlist);      win.ddlist.selection = 0;      // win.check_box.onClick = function (){      //     alert("check");      // };      win.reset.onClick = function(){        reset();      };      win.refresh.onClick = function() {        var curComp = app.project.activeItem;        if (!curComp || !(curComp instanceof CompItem)) {          alert('please select a comp');          return;        }        data.refreshing = true;        data.layerlist = [];        win.ddlist.removeAll();        for (var i = 1; i < curComp.numLayers + 1; i++) {          data.layerlist.push({            "name": curComp.layers[i].name,            "index": curComp.layers[i].index          });          win.ddlist.add('item', String(curComp.layers[i].index + ": " + curComp.layers[i].name));        }        win.ddlist.selection = 0;        data.refreshing = false;      };      win.ddlist.onChange = function() {        if(data.refreshing === false){        $.writeln(win.ddlist.selection.index + 1);        data.selectedLayer.index = win.ddlist.selection.index + 1;        }        isolate();      };    }    return win;  }function reset(){    var curComp = app.project.activeItem;    if (!curComp || !(curComp instanceof CompItem)) {      alert('please select a comp');      return;    }    for (var i = 1; i < curComp.numLayers + 1; i++) {        curComp.layers[i].shy = false;    }    curComp.hideShyLayers = false;}  function isolate() {    var curComp = app.project.activeItem;    if (!curComp || !(curComp instanceof CompItem)) {      alert('please select a comp');      return;    }    app.beginUndoGroup('something');    for (var i = 1; i < curComp.numLayers + 1; i++) {      if (curComp.layers[i].index !== data.selectedLayer.index) {        curComp.layers[i].shy = true;      } else {        curComp.layers[i].shy = false;      }    }    if(data.refreshing === false) curComp.hideShyLayers = true;    // var props = curComp.selectedProperties    app.endUndoGroup();  }}function refresh_ddlist() {  // "in function main. From here on it is a straight run"  //  // if(curComp.selectedLayers.length < 1){  //     alert('Please select at least one layer');  // return;  //     }} // close run
})(this);
