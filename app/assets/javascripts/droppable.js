$(function(){
  function cancel(e) {
    if (e.preventDefault) e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    return false;
  }

  function entities(s) {
    var e = {
      '"' : '"',
      '&' : '&',
      '<' : '<',
      '>' : '>'
    };
    return s.replace(/["&<>]/g, function (m) {
      return e[m];
    });
  }

  var drop = $('#droppable-div')[0];

  addEvent(drop, 'dragover', cancel);
  addEvent(drop, 'dragenter', cancel);

  addEvent(drop, 'drop', function (e) {
    if (e.preventDefault) e.preventDefault();
    drop.innerHTML = '<ul></ul>';
    debugger;
    var li = document.createElement('li');

    if (e.dataTransfer.types) {
      li.innerHTML = '<ul>';
      [].forEach.call(e.dataTransfer.types, function (type) {
        li.innerHTML += '<li>' + entities(e.dataTransfer.getData(type) + ' (content-type: ' + type + ')') + '</li>';
      });
      li.innerHTML += '</ul>';
      
    } else {
      li.innerHTML = e.dataTransfer.getData('Text');
    }
    
    var ul = drop.querySelector('ul');

    if (ul.firstChild) {
      ul.insertBefore(li, ul.firstChild);
    } else {
      ul.appendChild(li);
    }
    
    return false;
  });
});