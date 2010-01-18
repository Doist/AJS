function createExample(/*line1, line2...*/) {
  var cont = AJS.DIV();
  var expander = AJS.SPAN({'class': 'expander show'}, 'Show');

  var div_help = AJS.DIV({'class': 'div_help'});
  AJS.map(arguments, function(line) {
    //Place the right ident
    var ws_l = line.match(/^\s*/);
    if(ws_l != '') {
      var nbsp = ws_l[0].replace(/ /g, "&nbsp;");
      line = nbsp + line.substr(ws_l[0].length, line.length);
    }

    //Color
    line = line.replace(/</g, '&lt;');
    line = line.replace(/>/g, '&gt;');
    line = line.replace('var ', '<span class="vars">var </span>');
    line = line.replace('true', '<span style="color: green">true</span>');
    line = line.replace('null', '<span style="color: black">null</span>');
    line = line.replace('false', '<span style="color: red">false</span>');
    line = line.replace(/%(.*? )/g, '<span style="color: #0004AC">$1</span>');

    var sp = AJS.setHTML(AJS.SPAN(), line + '<br />');

    //Color comments
    if(line.search(/\/\//) == 0)
      AJS.setClass(sp, "comment");
    AJS.ACN(div_help, sp);
  });
  AJS.hideElement(div_help);
  var switch_fn = function(e) {
    if(expander.innerHTML == 'Show') {
      AJS.setHTML(expander, 'Hide');
      AJS.setClass(expander, 'expander hide');
      AJS.showElement(div_help);
    }
    else {
      AJS.setHTML(expander, 'Show');
      AJS.setClass(expander, 'expander show');
      AJS.hideElement(div_help);
    }
  }
  AJS.AEV(expander, 'click', switch_fn);
  AJS.ACN(cont, expander, div_help);
  AJS.DI(cont);
}

function buildTOC(elms) {
  var ul = AJS.UL({'class': 'TOC'});
  var li, a;
  AJS.map(elms, function(n) {
    a = AJS.A({href: '#' + n[1]}, n[0]);
    li = AJS.LI( a );
    AJS.ACN(ul, li);
  });
  AJS.DI(ul);
}
