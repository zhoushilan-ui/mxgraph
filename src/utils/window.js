export function getScroll(e) {
  e = e || window.event;
  if (e.wheelDelta == "120" || e.wheelDelta == "-120") {
    //IE/Opera/Chrome
    e.returnValue = false;
    var upcheck;
    if (e.wheelDelta) {
      upcheck = e.wheelDelta > 0 ? 1 : 0;
    } else {
      upcheck = e.detail < 0 ? 1 : 0;
    }
    if (upcheck) {
      graph.zoomIn();
    } else {
      graph.zoomOut();
    }
  } else if (e.detail) {
    //Firefox
    e.returnValue = false;
  }
}
