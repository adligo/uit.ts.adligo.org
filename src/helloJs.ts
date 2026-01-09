import { I_UIT, Registry, RegistryBuilder,UITBuilder } from "./common/templates.mjs";
import { ClientApp } from "./common/clientApp.mjs";

let rb = new RegistryBuilder();
rb.add(UITBuilder.of(ClientApp.MAIN_VIEW, 
`
<div>
  <div>
    <input type="text" onChange="callLog(event,this);" placeholder="Enter a number ..."/>
  </div>
</div>
`,
`
  function callLog(e, input) {
    console.log("callLog with event " + e.target.value);
  }
  console.log("in script from template.");
  //make the callLog function visable to the html
  // this is bad encapsulation but works for this simple demo
  window.callLog = callLog;
`).build());
console.log("creating ClientApp");
let app = new ClientApp(rb.build(), ClientApp.MAIN_VIEW);
app.bindAppScript();
app.show();
