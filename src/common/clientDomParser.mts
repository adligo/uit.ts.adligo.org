import { I_DomParser } from "./i_domParser.mjs";

export class ClientDomParser implements I_DomParser  {
    parser = new DOMParser;

    parseFromString(xml: string): Document {
        return this.parser.parseFromString(xml, 'application/xml');
    }

}