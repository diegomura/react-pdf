const painter = function(instance) {
  return {
    path: (...args) => painter(instance.path(...args)),
    fill: (...args) => painter(instance.fill(...args)),
    font: (...args) => painter(instance.font(...args)),
    text: (...args) => painter(instance.text(...args)),
    rect: (...args) => painter(instance.rect(...args)),
    scale: (...args) => painter(instance.scale(...args)),
    moveTo: (...args) => painter(instance.moveTo(...args)),
    lineTo: (...args) => painter(instance.lineTo(...args)),
    stroke: (...args) => painter(instance.stroke(...args)),
    circle: (...args) => painter(instance.circle(...args)),
    fontSize: (...args) => painter(instance.fontSize(...args)),
    fillColor: (...args) => painter(instance.fillColor(...args)),
    lineWidth: (...args) => painter(instance.lineWidth(...args)),
    translate: (...args) => painter(instance.translate(...args)),
    strokeColor: (...args) => painter(instance.strokeColor(...args)),
  };
};

export default painter;
