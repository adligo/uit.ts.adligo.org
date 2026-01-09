import { I_UIT, Registry, RegistryBuilder,UITBuilder } from "./common/templates.mjs";
import { ClientApp } from "./common/clientApp.mjs";

let rb = new RegistryBuilder();
rb.add(UITBuilder.of(ClientApp.MAIN_VIEW, 
`
<div>
  <input type="text" onChange="callLog(event,this)" placeholder="Enter a number ..."/>
</div>
`,
`
  function callLog(e, input) {
    console.log("callLog with event " + e.target.value);
  }
  console.log("in script from template.");
`).build());
console.log("creating ClientApp");
new ClientApp(rb.build(), ClientApp.MAIN_VIEW).show();
