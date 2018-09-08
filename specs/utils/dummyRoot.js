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
    instance.roundedRect = jest.fn().mockReturnValue(instance);
    instance.registerFont = jest.fn().mockReturnValue(instance);

    return {
      markDirty: jest.fn(),
      instance,
    };
  },
};
