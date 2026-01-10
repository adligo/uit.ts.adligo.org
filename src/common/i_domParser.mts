/**
 * The interfaces for parsing XML, HTML and SVG DOM Style
 * https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 * 
 * which are also done server side via jsdom since the DOMParser is not available outside of web browsers;
 * https://github.com/jsdom/jsdom
 */

export enum DomParserType {
    XML = "application/xml",
    HTML = "text/html",
    SVG = "image/svg+xml"
}

export interface I_DomParser {

    /**
     * 
     * @param xml really xml, html or svg is what were targeting.
     */
    parseFromString(string: string, type: DomParserType): Document;
}