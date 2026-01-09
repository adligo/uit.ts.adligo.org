import { I_Registry, I_UIT, isMissing, validateName } from "./templates.mjs"

declare global {
  interface Window {
    Registry: {
      [key: string]: any; // Allows you to add any key to the Registry
    };
  }
}

/**
 * The Client App takes over some of the DOM, by default is uses the body as the root element.
 * There will remain a limitation on this method, that;
 * You can only have one ClientApp per window per name (basically a tab element).
 *   There is a new JavaScript runtime per tab exept for tabs that call window.open.
 * 
 */
export class ClientApp {
  public static readonly BODY = "body";
  public static readonly DEFAULT_NAME = "ClientApp";
  public static readonly MAIN_VIEW = "MainView";
  registry: I_Registry;
  mainViewName: string;
  name: string = ClientApp.DEFAULT_NAME;
  rootElement: string = ClientApp.BODY;
  props: any = new Object();

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


  bindWindow(): ClientApp {
    window.Registry = {};
    
    function defineConstant(name, value) {
        // Define on the registry as a read-only property
        Object.defineProperty(window.Registry, name, {
            value: value,
            writable: false, 
            enumerable: true,
            configurable: false
        });
    }
    defineConstant(this.name, this);
    return this;
  }

  bindAppScript(): ClientApp {
    let mainView: I_UIT = this.registry.get(this.mainViewName);
    console.log("mainView.hasJs(): ", mainView.hasJs());
    if (mainView.hasJs()) {

        // Create a Blob from the string
        const blob = new Blob([mainView.getJs()], { type: 'application/javascript' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create the script element
        const script = document.createElement('script');
        script.type = "module";
        script.src = url;


        // Append and clean up the URL after loading
        //script.onload = () => URL.revokeObjectURL(url);
        document.head.appendChild(script);
    }
    return this;
  }


  show(): ChildNode {
    let mainView: I_UIT = this.registry.get(this.mainViewName);
    console.log("ClientApp.show with mainView  ", mainView);
    let parser = new DOMParser();
    let node = parser.parseFromString(mainView.getHtmlTemplate(), 'text/html');
    // 3. Grab the node from the virtual document's body
    const newNode = node.body.firstChild;
    if (this.rootElement === ClientApp.BODY) {
        if (newNode instanceof Element) {
          newNode.setAttribute('id', this.name +"." + ClientApp.MAIN_VIEW);
        }
        let cn = document.body.appendChild(newNode);
        return cn;
    } else {
    //else if by path
    //else by id
      const element = document.getElementById(this.rootElement);
      if (element) {
        element.innerHTML = mainView.getHtmlTemplate();
      } else {
        throw new Error("Root element not found: " + this.rootElement);
      }
    }
  }
  
  alert(message: string) {
    alert(message);
  }

  withName(name: string): ClientApp {
    validateName(name)
    this.name = name;
    return this;
  }

  withProps(props: any): ClientApp {
    if (isMissing(props)) {
      throw new Error("Props is required!");
    }
    this.props = props;
    return this;
  }
}

