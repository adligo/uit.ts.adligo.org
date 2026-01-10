import { I_Registry, I_UIT, isMissing } from "./templates.mjs";
import { ParsedNodeType } from "./domParserEngine.mjs";

// @depricated use parserEngine, we may want XML, HTML or SVG!

/**
 * Keeps the abstraction of pointers to 
 * User Interface Component Templates
 * by the id path
 * 
 * The html is generated and used at runtime, but this get's kept
 * for re-renderings 
 */
export class HtmlViewNode {
  uit: I_UIT;
  /**
   * the absolute id path
   */
  absPath: string;
  /**
   * the props passed in
   */
  props: any | null;

  constructor(uit: I_UIT, absPath: string, props: any | null) {
    if (isMissing(uit)) {
      throw new Error("UIT is required!");
    }
    if (isMissing(absPath)) {
      throw new Error("absPath is required!");
    }
    this.uit = uit;
    this.absPath = absPath;
    this.props = props;
  }
}


interface I_ParsedNode {
  getType(): ParsedNodeType;
}

class ParsedNode {

}

export class HtmlEngineResult {
  nodeMap: Map<string, HtmlViewNode>;
  html: string;
  /**
   * the absolute id path of the result
   */
  absPath: string;

  constructor(nodeMap: Map<string, HtmlViewNode>, html: string, absPath: string) {
    if (isMissing(nodeMap)) {
      throw new Error("nodeMap is required!");
    }
    if (isMissing(html)) {
      throw new Error("html is required!");
    }
    if (isMissing(absPath)) {
      throw new Error("absPath is required!");
    }
    this.nodeMap = nodeMap;
    this.html = html;
  }

  
}

export class HtmlViewEngine {
  appName: string;
  pathIdsToHtmlViewNodws : Map<string,HtmlViewNode> = new Map();
  registry: I_Registry;

  constructor(appName: string, registry: I_Registry) {
    if (isMissing(appName)) {
      throw new Error("appName is required!");
    }
    if (isMissing(registry)) {
      throw new Error("registry is required!");
    }
    this.appName = appName;
    this.registry = registry;
  }

  private _createHtmlView(parentAbsPath: string) {
    
  }

  /**
   * 
   * @returns 
   */
  createRootHtmlView(uitName: string): string {
    let map = new Map<string, HtmlViewNode>();

    return "HtmlToDO";
  }

  createHtmlView(): Map<string, HtmlViewNode> {
    let map = new Map<string, HtmlViewNode>();

    return map;
  }
}