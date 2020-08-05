import {convertContentTo, convertContentFrom} from '../lib/convert';
import {ContentState} from 'draft-js';

describe('convertContentTo', () => {

	let draftJsContent;
	beforeEach(() => {
		draftJsContent = ContentState.createFromText('some content');
	});

	it('converts DraftJS content to json', () => {
		expect(draftJsContent).toBeInstanceOf(ContentState);
		let content = convertContentTo(draftJsContent, 'json');
		expect(content).toBeInstanceOf(Object);
		expect(content.blocks).toBeDefined();
	});

	it('converts DraftJS content to html string', () => {
		expect(draftJsContent).toBeInstanceOf(ContentState);
		let content = convertContentTo(draftJsContent, 'html');
		expect(typeof content).toBe('string');
		expect(content).toBe('<p>some content</p>');
	});

	it('converts DraftJS content to string', () => {
		expect(draftJsContent).toBeInstanceOf(ContentState);
		let content = convertContentTo(draftJsContent, 'text');
		expect(typeof content).toBe('string');
		expect(content).toBe('some content');
	});
});

describe('convertContentFrom', () => {
	let draftJsContent;
	beforeEach(() => {
		draftJsContent = ContentState.createFromText('some content');
	});

	it('converts content from text string to DraftJS ContentState', () => {
		// get a text-string representation of a DraftJS object
		let textContent = convertContentTo(draftJsContent, 'text');
		let result = convertContentFrom(textContent, 'text');
		expect(result).toBeInstanceOf(ContentState);
	});

	it('converts content from json to DraftJS ContentState', () => {
		// get a json representation of a DraftJS object
		let jsonContent = convertContentTo(draftJsContent, 'json');
		let result = convertContentFrom(jsonContent, 'json');
		expect(result).toBeInstanceOf(ContentState);
	});

	it('converts content from html string to DraftJS ContentState', () => {
		// get a html-string representation of a DraftJS object
		let htmlContent = convertContentTo(draftJsContent, 'html');
		let result = convertContentFrom(htmlContent, 'html');
		expect(result).toBeInstanceOf(ContentState);
	});

	it('returns empty ContentState when no value is passed in', () => {
		let result = convertContentFrom();
		expect(result).toBeInstanceOf(ContentState);
		expect(result.hasText()).toBe(false);
	});

	it('returns original value when type is not in [\'text\',\'json\',\'html\']', () => {
		let htmlContent = convertContentTo(draftJsContent, 'html');
		let result = convertContentFrom(htmlContent);
		expect(typeof result).toBe('string');
	});
});
