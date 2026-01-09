import { I_Registry, I_UIT, isMissing } from "./templates.mjs"
/**
 * The Client App takes over some of the DOM, by default is uses the body as the root element.
 * 
 */
export class ClientApp {
  public static readonly BODY = "body";
  public static readonly MAIN_VIEW = "MainView";
  registry: I_Registry;
  mainViewName: string;
  rootElement: string = ClientApp.BODY;


  constructor(registry: I_Registry, mainView: string, rootElement: string = ClientApp.BODY) {
    if (isMissing(registry)) {
      throw new Error("Registry is required!");
    }
    if (isMissing(mainView)) {
      throw new Error("Main view is required!");
    }
    this.registry = registry;
    this.mainViewName = mainView;
    this.rootElement = rootElement;
  }

  show() {
    let mainView: I_UIT = this.registry.get(this.mainViewName);
    console.log("ClientApp.show with mainView  ", mainView);
    if (this.rootElement === ClientApp.BODY) {
      document.body.innerHTML = mainView.getHtml();
    } else {
      const element = document.getElementById(this.rootElement);
      if (element) {
        element.innerHTML = mainView.getHtml();
      } else {
        throw new Error("Root element not found: " + this.rootElement);
      }
    }
    console.log("mainView.hasJs(): ", mainView.hasJs());
    if (mainView.hasJs()) {

        // Create a Blob from the string
        const blob = new Blob([mainView.getJs()], { type: 'application/javascript' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create the script element
        const script = document.createElement('script');
        script.src = url;

        // Append and clean up the URL after loading
        script.onload = () => URL.revokeObjectURL(url);
        document.head.appendChild(script);
    }
  }
}

