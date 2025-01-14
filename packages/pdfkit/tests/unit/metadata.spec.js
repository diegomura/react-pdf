import { beforeEach, describe, expect, test } from 'vitest';

import PDFMetadata from '../../src/metadata';

describe('PDFMetadata', () => {
    let metadata;
    beforeEach(() => {
        metadata = new PDFMetadata();
    });

    test('initialising metadata', () => {
        expect(metadata._metadata).toBeDefined();
        expect(metadata.getLength()).toBeGreaterThan(0);
        expect(typeof metadata._metadata).toBe('string')
    });

    test('contains appended XML', () => {
        let xml = `
        <dc:title>
            <rdf:Alt>
                <rdf:li xml:lang="x-default">Test</rdf:li>
            </rdf:Alt>
        </dc:title>
        `
        metadata.append(xml);
        expect(metadata.getXML()).toContain(xml);
    });

    test('closing tags', () => {
        let length = metadata.getLength();
        metadata.end();
        expect(metadata.getLength()).toBeGreaterThan(length);
    });

});
