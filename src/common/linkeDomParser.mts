import {DOMParser, parseHTML} from 'linkedom';

/**
 * the jsdom parser can be used both client and serverside
 */

import { I_DomParser, DomParserType } from "./i_domParser.mjs";

export class LinkeDomParser implements I_DomParser  {

    parseFromString(xml: string, type): Document {
        return parseHTML(xml, { contentType: type }).window.document;
    }

}