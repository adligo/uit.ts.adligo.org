import { I_Registry, I_UIT, isMissing } from "./templates.mjs"
/**
 * The Client App takes over some of the DOM, by default is uses the body as the root element.
 * 
 */
export class ClientApp {
  public static readonly BODY = "body";
  public static readonly MAIN_VIEW = "MainView";
  registry: I_Registry;
  mainView: string;
  rootElement: string = ClientApp.BODY;


  constructor(registry: I_Registry, mainView: string, rootElement: string = ClientApp.BODY) {
    if (isMissing(registry)) {
      throw new Error("Registry is required!");
    }
    if (isMissing(mainView)) {
      throw new Error("Main view is required!");
    }
    this.registry = registry;
    this.mainView = mainView;
    this.rootElement = rootElement;
  }

  show() {
    if (this.rootElement === ClientApp.BODY) {
      document.body.innerHTML = this.registry.get(this.mainView).getHtml();
    } else {
      const element = document.getElementById(this.rootElement);
      if (element) {
        element.innerHTML = this.registry.get(this.mainView).getHtml();
      } else {
        throw new Error("Root element not found: " + this.rootElement);
      }
    }
  }
}

