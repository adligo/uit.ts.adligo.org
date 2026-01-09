import { I_Registry, I_UIT, isMissing } from "./templates.mjs";

export class HtmlViewNameNode {
  uit: I_UIT;
  /**
   * the absolute path
   */
  absPath: string;
  /**
   * the relative path
   */
  relPath: string;

  constructor(uit: I_UIT, absPath: string, relPath: string) {
    if (isMissing(uit)) {
      throw new Error("UIT is required!");
    }
    if (isMissing(absPath)) {
      throw new Error("absPath is required!");
    }
    if (isMissing(relPath)) {
      throw new Error("relPath is required!");
    }
    this.uit = uit;
    this.absPath = absPath;
    this.relPath = relPath;
  }
}

enum HtmlTemplateNodeType {
  /**
   * all the arbitrary text related to javascript and html
   */
  ETC,
  /**
   * $loop(UITName,uitPropList)
   */
  LOOP,
  /**
   * $this gets replaced with a lookup;
   * window.Registry.MyAppName.lookup(uitId)
   * to this component by id
   * which is comprised of the AppName.ViewName.PanelName[panelIndex].ComponentName[componentIndex] etc
   * i.e. ClientApp.MainView.NavBar
   * or ClientApp.MainView.MainPanel.Card[3]
   */
  THIS,
  /**
   * UIT is a nested user interface template, which may have a single props value passed down 
   * in the JSX style
   * <MyThing />
   * or
   * <MyThing {myProps} />
   */
  UIT,
  /**
   * $val(somePropName)
   */
  VAL 
}
interface I_HtmlTemplateNode {
  getType(): HtmlTemplateNodeType;
}

class HtmlTemplateNode {

}

export class HtmlEngineResult {
  nodeMap: Map<string, HtmlViewNameNode>;
  html: string;

  constructor(nodeMap: Map<string, HtmlViewNameNode>, html: string) {
    this.nodeMap = nodeMap;
    this.html = html;
  }

  
}

export class HtmlEngine {
  registry: I_Registry;
  viewName: string;

  constructor(registry: I_Registry, viewName: string) {
    this.registry = registry;
    this.viewName = viewName;
  }

  private _createHtmlView() {
    
  }

  createHtmlView(): Map<string, HtmlViewNameNode> {
    let map = new Map<string, HtmlViewNameNode>();

    return map;
  }
}