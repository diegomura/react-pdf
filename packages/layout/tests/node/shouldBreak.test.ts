import { describe, expect, test } from 'vitest';

import * as P from '@react-pdf/primitives';
import shouldBreak from '../../src/node/shouldBreak';

describe('node shouldBreak', () => {
  test('should not break when the child has enough space on the page', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: {},
        style: {},
        children: [],
        box: { top: 50, right: 0, bottom: 0, left: 0, height: 400, width: 200 },
      },
      [],
      1000,
      [],
    );

    expect(result).toEqual(false);
  });

  test('should break when the child has enough space on the page', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { break: true },
        style: {},
        children: [],
        box: { top: 50, right: 0, bottom: 0, left: 0, height: 400, width: 200 },
      },
      [],
      1000,
      [],
    );

    expect(result).toEqual(true);
  });

  test('should not break when the child can be wrapped', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { wrap: true },
        style: {},
        children: [],
        box: {
          top: 50,
          right: 0,
          bottom: 0,
          left: 0,
          height: 1400,
          width: 200,
        },
      },
      [],
      1000,
      [],
    );

    expect(result).toEqual(false);
  });

  test('should break when the child is an unwrappable node', () => {
    const result = shouldBreak(
      {
        type: P.Image,
        props: { wrap: true } as any,
        style: {},
        children: [],
        box: {
          top: 50,
          right: 0,
          bottom: 0,
          left: 0,
          height: 1400,
          width: 200,
        },
      },
      [],
      1000,
      [],
    );

    expect(result).toEqual(true);
  });

  test('should break when the child has wrapping disabled', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { wrap: false },
        style: {},
        children: [],
        box: {
          top: 50,
          right: 0,
          bottom: 0,
          left: 0,
          height: 1400,
          width: 200,
        },
      },
      [],
      1000,
      [],
    );

    expect(result).toEqual(true);
  });

  test('should break when minPresenceAhead is large enough and there are overflowing siblings after the child', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { minPresenceAhead: 400 },
        style: {},
        children: [],
        box: {
          top: 500,
          right: 0,
          bottom: 0,
          left: 0,
          height: 400,
          width: 200,
          marginTop: 0,
          marginBottom: 0,
        },
      },
      [
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 900,
            right: 0,
            bottom: 0,
            left: 0,
            height: 200,
            width: 200,
            marginTop: 0,
            marginBottom: 0,
          },
        },
      ],
      1000,
      [
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 900,
            right: 0,
            bottom: 0,
            left: 0,
            height: 200,
            width: 200,
            marginTop: 0,
            marginBottom: 0,
          },
        },
      ],
    );

    expect(result).toEqual(true);
  });

  test('should break when minPresenceAhead is large enough and there are overflowing siblings due to margins after the child', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { minPresenceAhead: 400 },
        style: {},
        children: [],
        box: {
          top: 500,
          right: 0,
          bottom: 0,
          left: 0,
          height: 400,
          width: 200,
          marginTop: 0,
          marginBottom: 0,
        },
      },
      [
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 1100,
            right: 0,
            bottom: 0,
            left: 0,
            height: 0,
            width: 200,
            marginTop: 200,
            marginBottom: 0,
          },
        },
      ],
      1000,
      [
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 900,
            right: 0,
            bottom: 0,
            left: 0,
            height: 200,
            width: 200,
            marginTop: 0,
            marginBottom: 0,
          },
        },
      ],
    );

    expect(result).toEqual(true);
  });

  test('should not break when minPresenceAhead is not past the page end', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { minPresenceAhead: 100 },
        style: {},
        children: [],
        box: {
          top: 500,
          right: 0,
          bottom: 0,
          left: 0,
          height: 400,
          width: 200,
          marginTop: 0,
          marginBottom: 0,
        },
      },
      [
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 900,
            right: 0,
            bottom: 0,
            left: 0,
            height: 200,
            width: 200,
            marginTop: 0,
            marginBottom: 0,
          },
        },
      ],
      1000,
      [],
    );

    expect(result).toEqual(false);
  });

  test('should not break when the siblings after the child do not overflow past the page end', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { minPresenceAhead: 400 },
        style: {},
        children: [],
        box: {
          top: 500,
          right: 0,
          bottom: 0,
          left: 0,
          height: 400,
          width: 200,
          marginTop: 0,
          marginBottom: 0,
        },
      },
      [
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 900,
            right: 0,
            bottom: 0,
            left: 0,
            height: 100,
            width: 200,
            marginTop: 0,
            marginBottom: 0,
          },
        },
      ],
      1000,
      [],
    );

    expect(result).toEqual(false);
  });

  test('should not break when the siblings after the child do not overflow past the page end, with margins', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { minPresenceAhead: 400 },
        style: {},
        children: [],
        box: {
          top: 500,
          right: 0,
          bottom: 0,
          left: 0,
          height: 400,
          width: 200,
          marginTop: 0,
          marginBottom: 0,
        },
      },
      [
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 1000,
            right: 0,
            bottom: 0,
            left: 0,
            height: 0,
            width: 200,
            marginTop: 100,
            marginBottom: 0,
          },
        },
      ],
      1000,
      [],
    );

    expect(result).toEqual(false);
  });

  test("should not break when only the last sibling's bottom margin overflows past the page end", () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { minPresenceAhead: 400 },
        style: {},
        children: [],
        box: {
          top: 500,
          right: 0,
          bottom: 0,
          left: 0,
          height: 400,
          width: 200,
          marginTop: 0,
          marginBottom: 0,
        },
      },
      [
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 900,
            right: 0,
            bottom: 0,
            left: 0,
            height: 100,
            width: 200,
            marginTop: 0,
            marginBottom: 100,
          },
        },
      ],
      1000,
      [],
    );

    expect(result).toEqual(false);
  });

  test('should not break due to minPresenceAhead when breaking does not improve presence because the node is already the first non-fixed node on the page, to avoid infinite loops', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { minPresenceAhead: 400 },
        style: {},
        children: [],
        box: {
          top: 500,
          right: 0,
          bottom: 0,
          left: 0,
          height: 400,
          width: 200,
          marginTop: 500,
          marginBottom: 0,
        },
      },
      [
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 900,
            right: 0,
            bottom: 0,
            left: 0,
            height: 200,
            width: 200,
            marginTop: 0,
            marginBottom: 0,
          },
        },
      ],
      1000,
      [],
    );

    expect(result).toEqual(false);
  });

  test('should not break due to minPresenceAhead even when there are some previous fixed nodes on the page, to avoid infinite loops', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { minPresenceAhead: 400 },
        style: {},
        children: [],
        box: {
          top: 500,
          right: 0,
          bottom: 0,
          left: 0,
          height: 400,
          width: 200,
          marginTop: 500,
          marginBottom: 0,
        },
      },
      [
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 900,
            right: 0,
            bottom: 0,
            left: 0,
            height: 200,
            width: 200,
            marginTop: 0,
            marginBottom: 0,
          },
        },
      ],
      1000,
      [
        {
          type: 'VIEW',
          props: {
            fixed: true,
          },
          style: {},
          children: [],
          box: {
            top: 900,
            right: 0,
            bottom: 0,
            left: 0,
            height: 200,
            width: 200,
            marginTop: 0,
            marginBottom: 0,
          },
        },
      ],
    );

    expect(result).toEqual(false);
  });

  test('should never break fixed child', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { minPresenceAhead: 400, fixed: true },
        style: {},
        children: [],
        box: {
          top: 500,
          right: 0,
          bottom: 0,
          left: 0,
          height: 400,
          width: 200,
          marginTop: 0,
          marginBottom: 0,
        },
      },
      [
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 900,
            right: 0,
            bottom: 0,
            left: 0,
            height: 200,
            width: 200,
            marginTop: 0,
            marginBottom: 0,
          },
        },
      ],
      1000,
      [],
    );

    expect(result).toEqual(false);
  });

  test('should ignore fixed elements after child', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { minPresenceAhead: 400, fixed: true },
        style: {},
        children: [],
        box: {
          top: 500,
          right: 0,
          bottom: 0,
          left: 0,
          height: 400,
          width: 200,
          marginTop: 0,
          marginBottom: 0,
        },
      },
      [
        {
          type: 'VIEW',
          props: { fixed: true },
          style: {},
          children: [],
          box: {
            top: 900,
            right: 0,
            bottom: 0,
            left: 0,
            height: 200,
            width: 200,
            marginTop: 0,
            marginBottom: 0,
          },
        },
      ],
      1000,
      [],
    );

    expect(result).toEqual(false);
  });

  test('should work with trivial minimal reproduction example', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { minPresenceAhead: 100 },
        style: {},
        children: [],
        box: {
          top: 30,
          right: 0,
          bottom: 0,
          left: 0,
          height: 0,
          width: 200,
          marginTop: 0,
          marginBottom: 0,
        },
      },
      [
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 30,
            right: 0,
            bottom: 0,
            left: 0,
            height: 70,
            width: 200,
            marginTop: 0,
            marginBottom: 0,
          },
        },
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 130,
            right: 0,
            bottom: 0,
            left: 0,
            height: 0,
            width: 200,
            marginTop: 30,
            marginBottom: 0,
          },
        },
      ],
      811.89,
      [],
    );

    expect(result).toEqual(false);
  });

  test('should work with minimal infinite loop reproduction example', () => {
    const result = shouldBreak(
      {
        type: 'VIEW',
        props: { minPresenceAhead: 100 },
        style: {},
        children: [],
        box: {
          top: 30,
          right: 0,
          bottom: 0,
          left: 0,
          height: 0,
          width: 200,
          marginTop: 0,
          marginBottom: 0,
        },
      },
      [
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 30,
            right: 0,
            bottom: 0,
            left: 0,
            height: 71,
            width: 200,
            marginTop: 0,
            marginBottom: 0,
          },
        },
        {
          type: 'VIEW',
          props: {},
          style: {},
          children: [],
          box: {
            top: 131,
            right: 0,
            bottom: 0,
            left: 0,
            height: 0,
            width: 200,
            marginTop: 30,
            marginBottom: 0,
          },
        },
      ],
      811.89,
      [],
    );

    expect(result).toEqual(false);
  });

  test('should work with reproduction from #2303', () => {
    const result = shouldBreak(
      {
        type: 'TEXT',
        box: {
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          marginTop: 12,
          marginRight: 12,
          marginBottom: 12,
          marginLeft: 12,
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderBottomWidth: 0,
          borderLeftWidth: 0,
          top: 541.7999877929688,
          right: 12,
          bottom: 12,
          left: 72,
          width: 451.280029296875,
          height: 250.8800048828125,
        },
        style: {
          marginTop: 12,
          marginRight: 12,
          marginBottom: 12,
          marginLeft: 12,
          fontSize: 14,
          textAlign: 'justify',
          fontFamily: 'Times-Roman',
        },
        props: {
          minPresenceAhead: 4,
        },
        children: [
          {
            type: 'TEXT_INSTANCE',
            value:
              'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. El resto della concluían sayo de velarte, calzas de velludo para las fiestas con sus pantuflos de lo mismo, los días de entre semana se honraba con su vellori de lo más fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo con los cincuenta años, era de complexión recia, seco de carnes, enjuto de rostro; gran madrugador y amigo de la caza. Quieren decir que tenía el sobrenombre de Quijada o Quesada (que en esto hay alguna diferencia en los autores que deste caso escriben), aunque por conjeturas verosímiles se deja entender que se llama Quijana; pero esto importa poco a nuestro cuento; basta que en la narración dél no se salga un punto de la verdad',
          },
        ],
      },
      [
        {
          type: 'TEXT',
          box: {
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            marginTop: 550,
            marginRight: 0,
            marginBottom: 0,
            marginLeft: 0,
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            top: 1354.679931640625,
            right: 0,
            bottom: 0,
            left: 60,
            width: 475.280029296875,
            height: 19.799999237060547,
          },
          style: {
            marginTop: 550,
          },
          props: {},
          children: [
            {
              type: 'TEXT_INSTANCE',
              value: 'Orphans example. Try changing prop value',
            },
          ],
        },
        {
          type: 'TEXT',
          box: {
            paddingTop: 0,
            paddingRight: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            marginTop: 12,
            marginRight: 12,
            marginBottom: 12,
            marginLeft: 12,
            borderTopWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            top: 1386.47998046875,
            right: 12,
            bottom: 12,
            left: 72,
            width: 451.280029296875,
            height: 250.8800048828125,
          },
          style: {
            marginTop: 12,
            marginRight: 12,
            marginBottom: 12,
            marginLeft: 12,
            fontSize: 14,
            textAlign: 'justify',
            fontFamily: 'Times-Roman',
          },
          props: {
            orphans: 4,
          },
          children: [
            {
              type: 'TEXT_INSTANCE',
              value:
                'En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que carnero, salpicón las más noches, duelos y quebrantos los sábados, lentejas los viernes, algún palomino de añadidura los domingos, consumían las tres partes de su hacienda. El resto della concluían sayo de velarte, calzas de velludo para las fiestas con sus pantuflos de lo mismo, los días de entre semana se honraba con su vellori de lo más fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina que no llegaba a los veinte, y un mozo de campo y plaza, que así ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro hidalgo con los cincuenta años, era de complexión recia, seco de carnes, enjuto de rostro; gran madrugador y amigo de la caza. Quieren decir que tenía el sobrenombre de Quijada o Quesada (que en esto hay alguna diferencia en los autores que deste caso escriben), aunque por conjeturas verosímiles se deja entender que se llama Quijana; pero esto importa poco a nuestro cuento; basta que en la narración dél no se salga un punto de la verdad',
            },
          ],
        },
      ],
      781.89,
      [],
    );

    expect(result).toEqual(false);
  });

  test('should not break when the child can wrap', () => {
    const result = shouldBreak(
      {
        type: 'TEXT',
        props: {},
        style: {},
        children: [],
        box: {
          top: 425.23779296875,
          right: 0,
          bottom: 0,
          left: 0,
          height: 419.439453125,
          width: 200,
          marginTop: 12,
          marginBottom: 12,
        },
      },
      [
        {
          type: 'TEXT',
          props: {},
          style: {},
          children: [],
          box: {
            top: 868.67724609375,
            right: 0,
            bottom: 0,
            left: 0,
            height: 247.8505859375,
            width: 200,
            marginTop: 12,
            marginBottom: 12,
          },
        },
      ],
      776.89,
      [],
    );

    expect(result).toEqual(false);
  });
});
