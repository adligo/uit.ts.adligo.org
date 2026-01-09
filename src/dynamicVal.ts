import { I_UIT, Registry, RegistryBuilder,UITBuilder } from "./common/templates.mjs";
import { ClientApp } from "./common/clientApp.mjs";

let rb = new RegistryBuilder();
rb.add(UITBuilder.of(ClientApp.MAIN_VIEW, 
`
<div>
  <h3>$val(propsTitle)</h3>
</div>
`).build());
console.log("creating ClientApp");
let app = new ClientApp(rb.build(), ClientApp.MAIN_VIEW);
let props : any = new Object();
props.propsTitle  = "Hello Props Title!";
app.bindWindow().bindAppScript();
app.show();

