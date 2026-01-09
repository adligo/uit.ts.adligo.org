import { I_UIT, Registry, RegistryBuilder,UITBuilder } from "./common/templates.mjs";
import { ClientApp } from "./common/clientApp.mjs";

let rb = new RegistryBuilder();
rb.add(UITBuilder.of(ClientApp.MAIN_VIEW, 
`
<div>
  <h3>TODO dynamic $this and title</h3>
  <input type="text" onChange="$this.callLog(event,this)" placeholder="Enter a number ..."/>
  <input type="submit" onClick="$this.reRender(event,this)" value="ReRender"/>
</div>
`,
`
  function callLog(e, input) {
    console.log("callLog with event " + e.target.value);
  }

  function reRender(e, input) {
    console.log("reRender with app " + app);
    app.show();
  }
  console.log("in script from template.");
  //const globalScope = Object.keys(window);

  //console.log(globalScope);
  //console.log(self);
  //const windowGlobals = Object.keys(window);
  //console.log("windowGlobals are " + windowGlobals);
  console.log(window.Registry.MyAppName);
  window.Registry.MyAppName.alert("Hello from the script!");
  console.log("window.Registry.MyAppName.MainView is " + window.Registry.MyAppName.MainView);
`).build());
console.log("creating ClientApp");
// Note this MyAppName binds to the script above console.log(window.Registry.MyAppName);
let app = new ClientApp(rb.build(), ClientApp.MAIN_VIEW).withName("MyAppName");
app.bindWindow();
app.bindAppScript();
app.show();

