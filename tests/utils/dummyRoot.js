export default {
  reset: () => {
    const instance = {};

    instance.info = {};
    instance.end = jest.fn().mockReturnValue(instance);
    instance.rect = jest.fn().mockReturnValue(instance);
    instance.save = jest.fn().mockReturnValue(instance);
    instance.fill = jest.fn().mockReturnValue(instance);
    instance.image = jest.fn().mockReturnValue(instance);
    instance.restore = jest.fn().mockReturnValue(instance);
    instance.addPage = jest.fn().mockReturnValue(instance);
    instance.fillColor = jest.fn().mockReturnValue(instance);
    instance.fillOpacity = jest.fn().mockReturnValue(instance);
    instance.roundedRect = jest.fn().mockReturnValue(instance);
    instance.fillAndStroke = jest.fn().mockReturnValue(instance);
    instance.radialGradient = jest.fn().mockReturnValue(instance);
    instance.registerFont = jest.fn().mockReturnValue(instance);
    instance.lineWidth = jest.fn().mockReturnValue(instance);
    instance.moveTo = jest.fn().mockReturnValue(instance);
    instance.quadraticCurveTo = jest.fn().mockReturnValue(instance);
    instance.lineTo = jest.fn().mockReturnValue(instance);
    instance.strokeColor = jest.fn().mockReturnValue(instance);
    instance.strokeOpacity = jest.fn().mockReturnValue(instance);
    instance.stroke = jest.fn().mockReturnValue(instance);
    instance.dash = jest.fn().mockReturnValue(instance);
    instance.note = jest.fn().mockReturnValue(instance);
    instance.rotate = jest.fn().mockReturnValue(instance);
    instance.scale = jest.fn().mockReturnValue(instance);
    instance.translate = jest.fn().mockReturnValue(instance);
    instance.link = jest.fn().mockReturnValue(instance);
    instance.goTo = jest.fn().mockReturnValue(instance);
    instance.addNamedDestination = jest.fn().mockReturnValue(instance);
    instance.clip = jest.fn().mockReturnValue(instance);
    instance.bezierCurveTo = jest.fn().mockReturnValue(instance);
    instance.closePath = jest.fn().mockReturnValue(instance);
    instance.undash = jest.fn().mockReturnValue(instance);
    instance.moveTo = jest.fn().mockReturnValue(instance);
    instance.path = jest.fn().mockReturnValue(instance);
    instance.radialGradient = jest.fn().mockReturnValue(instance);
    instance.linearGradient = jest.fn().mockReturnValue(instance);
    instance.miterLimit = jest.fn().mockReturnValue(instance);
    instance.fontSize = jest.fn().mockReturnValue(instance);
    instance.lineJoin = jest.fn().mockReturnValue(instance);
    instance.polygon = jest.fn().mockReturnValue(instance);
    instance.circle = jest.fn().mockReturnValue(instance);
    instance.ellipse = jest.fn().mockReturnValue(instance);
    instance.opacity = jest.fn().mockReturnValue(instance);
    instance.lineCap = jest.fn().mockReturnValue(instance);
    instance.text = jest.fn().mockReturnValue(instance);
    instance.font = jest.fn().mockReturnValue(instance);

    return {
      instance,
      markDirty: jest.fn(),
    };
  },
};
