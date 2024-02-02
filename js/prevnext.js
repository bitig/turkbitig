document.addEventListener('keydown', function(event) {
  var prevnextDiv = document.getElementById('prevnext');
  var links = prevnextDiv.getElementsByTagName('a');
  
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    var focusedLink = document.activeElement;
    var index = Array.from(links).indexOf(focusedLink);
    var nextIndex = index + 1;
    
    if (nextIndex < links.length) {
      links[nextIndex].click();
    } else {
      links[0].click();
    }
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    var focusedLink = document.activeElement;
    var index = Array.from(links).indexOf(focusedLink);
    var previousIndex = index - 1;
    
    if (previousIndex >= 0) {
      links[previousIndex].click();
    } else {
      links[links.length - 1].click();
    }
  }
});