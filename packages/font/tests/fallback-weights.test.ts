import { describe, expect, it } from 'vitest';

import FontStore from '../src';

describe('fallback weights', () => {
  describe('if the target weight given is between 400 and 500 inclusive', () => {
    it('look for available weights between the target and 500 in ascending order', () => {
      const fontStore = new FontStore();

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 200,
        src: 'https://example.com/Roboto-normal-200.ttf',
      });

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 420,
        src: 'https://example.com/Roboto-normal-420.ttf',
      });

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 470,
        src: 'https://example.com/Roboto-normal-470.ttf',
      });

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 600,
        src: 'https://example.com/Roboto-normal-600.ttf',
      });

      const font = fontStore.getFont({
        fontFamily: 'Roboto',
        fontWeight: 450,
      });

      expect(font?.src).toBe('https://example.com/Roboto-normal-470.ttf');
    });

    it('if no match is found, look for available weights less than the target, in descending order', () => {
      const fontStore = new FontStore();

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 100,
        src: 'https://example.com/Roboto-normal-100.ttf',
      });

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 200,
        src: 'https://example.com/Roboto-normal-200.ttf',
      });

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 600,
        src: 'https://example.com/Roboto-normal-600.ttf',
      });

      const font = fontStore.getFont({
        fontFamily: 'Roboto',
        fontWeight: 450,
      });

      expect(font?.src).toBe('https://example.com/Roboto-normal-200.ttf');
    });

    it('if no match is found, look for available weights greater than 500, in ascending order.', () => {
      const fontStore = new FontStore();

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 600,
        src: 'https://example.com/Roboto-normal-600.ttf',
      });

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 700,
        src: 'https://example.com/Roboto-normal-700.ttf',
      });

      const font = fontStore.getFont({
        fontFamily: 'Roboto',
        fontWeight: 450,
      });

      expect(font?.src).toBe('https://example.com/Roboto-normal-600.ttf');
    });
  });

  describe('if a weight less than 400 is given', () => {
    it('look for available weights less than the target, in descending order.', () => {
      const fontStore = new FontStore();

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 100,
        src: 'https://example.com/Roboto-normal-100.ttf',
      });

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 200,
        src: 'https://example.com/Roboto-normal-200.ttf',
      });

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        src: 'https://example.com/Roboto-normal-500.ttf',
      });

      const font = fontStore.getFont({
        fontFamily: 'Roboto',
        fontWeight: 300,
      });

      expect(font?.src).toBe('https://example.com/Roboto-normal-200.ttf');
    });

    it('if no match is found, look for available weights greater than the target, in ascending order', () => {
      const fontStore = new FontStore();

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        src: 'https://example.com/Roboto-normal-500.ttf',
      });

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 600,
        src: 'https://example.com/Roboto-normal-600.ttf',
      });

      const font = fontStore.getFont({
        fontFamily: 'Roboto',
        fontWeight: 300,
      });

      expect(font?.src).toBe('https://example.com/Roboto-normal-500.ttf');
    });
  });

  describe('if a weight greater than 500 is given', () => {
    it('look for available weights greater than the target, in ascending order', () => {
      const fontStore = new FontStore();

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 200,
        src: 'https://example.com/Roboto-normal-200.ttf',
      });

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 700,
        src: 'https://example.com/Roboto-normal-700.ttf',
      });

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 800,
        src: 'https://example.com/Roboto-normal-800.ttf',
      });

      const font = fontStore.getFont({
        fontFamily: 'Roboto',
        fontWeight: 600,
      });

      expect(font?.src).toBe('https://example.com/Roboto-normal-700.ttf');
    });

    it('if no match is found, look for available weights less than the target, in descending order', () => {
      const fontStore = new FontStore();

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 100,
        src: 'https://example.com/Roboto-normal-100.ttf',
      });

      fontStore.register({
        family: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 200,
        src: 'https://example.com/Roboto-normal-200.ttf',
      });

      const font = fontStore.getFont({
        fontFamily: 'Roboto',
        fontWeight: 600,
      });

      expect(font?.src).toBe('https://example.com/Roboto-normal-200.ttf');
    });
  });
});
