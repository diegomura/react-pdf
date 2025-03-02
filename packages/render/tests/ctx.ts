import { vi } from 'vitest';

const createCTX = () => {
  const instance: any = {};

  instance.info = {};
  instance.end = vi.fn().mockReturnValue(instance);
  instance.rect = vi.fn().mockReturnValue(instance);
  instance.save = vi.fn().mockReturnValue(instance);
  instance.fill = vi.fn().mockReturnValue(instance);
  instance.image = vi.fn().mockReturnValue(instance);
  instance.restore = vi.fn().mockReturnValue(instance);
  instance.addPage = vi.fn().mockReturnValue(instance);
  instance.fillColor = vi.fn().mockReturnValue(instance);
  instance.fillOpacity = vi.fn().mockReturnValue(instance);
  instance.roundedRect = vi.fn().mockReturnValue(instance);
  instance.registerFont = vi.fn().mockReturnValue(instance);
  instance.lineWidth = vi.fn().mockReturnValue(instance);
  instance.moveTo = vi.fn().mockReturnValue(instance);
  instance.quadraticCurveTo = vi.fn().mockReturnValue(instance);
  instance.lineTo = vi.fn().mockReturnValue(instance);
  instance.strokeColor = vi.fn().mockReturnValue(instance);
  instance.strokeOpacity = vi.fn().mockReturnValue(instance);
  instance.stroke = vi.fn().mockReturnValue(instance);
  instance.dash = vi.fn().mockReturnValue(instance);
  instance.note = vi.fn().mockReturnValue(instance);
  instance.rotate = vi.fn().mockReturnValue(instance);
  instance.scale = vi.fn().mockReturnValue(instance);
  instance.translate = vi.fn().mockReturnValue(instance);
  instance.link = vi.fn().mockReturnValue(instance);
  instance.goTo = vi.fn().mockReturnValue(instance);
  instance.addNamedDestination = vi.fn().mockReturnValue(instance);
  instance.clip = vi.fn().mockReturnValue(instance);
  instance.bezierCurveTo = vi.fn().mockReturnValue(instance);
  instance.closePath = vi.fn().mockReturnValue(instance);
  instance.undash = vi.fn().mockReturnValue(instance);
  instance.moveTo = vi.fn().mockReturnValue(instance);
  instance.path = vi.fn().mockReturnValue(instance);
  instance.radialGradient = vi.fn().mockReturnValue(instance);
  instance.linearGradient = vi.fn().mockReturnValue(instance);
  instance.miterLimit = vi.fn().mockReturnValue(instance);
  instance.fontSize = vi.fn().mockReturnValue(instance);
  instance.lineJoin = vi.fn().mockReturnValue(instance);
  instance.polygon = vi.fn().mockReturnValue(instance);
  instance.circle = vi.fn().mockReturnValue(instance);
  instance.ellipse = vi.fn().mockReturnValue(instance);
  instance.opacity = vi.fn().mockReturnValue(instance);
  instance.lineCap = vi.fn().mockReturnValue(instance);
  instance.text = vi.fn().mockReturnValue(instance);
  instance.font = vi.fn().mockReturnValue(instance);
  instance._root = { data: { AcroForm: {} } };
  instance.textInput = vi.fn().mockReturnValue(instance);
  instance.formField = vi.fn().mockReturnValue(instance);
  instance.formCombo = vi.fn().mockReturnValue(instance);
  instance.formList = vi.fn().mockReturnValue(instance);
  instance.formText = vi.fn().mockReturnValue(instance);
  instance.initForm = vi.fn().mockReturnValue(instance);
  instance.outline = {
    children: [],
    document: vi.fn().mockReturnValue(instance),
    addItem: vi.fn().mockReturnValue(instance),
    endOutline: vi.fn().mockReturnValue(instance),
  };

  return instance;
};

export default createCTX;
