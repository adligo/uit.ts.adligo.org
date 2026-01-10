import { RegistryBuilder,UITBuilder } from "./common/templates.mjs";
import { ClientApp } from "./common/clientApp.mjs";

let rb : RegistryBuilder= new RegistryBuilder();
let DYN_T = "DynT";
rb.add(UITBuilder.of(DYN_T, `
<div>
  <h3>$val(propsTitle)</h3>
</div>
`).build());
console.log("creating ClientApp");
let app = new ClientApp(rb.build(), DYN_T);
let props : any = new Object();
props.propsTitle  = "Hello Props Title!";
app.bindWindow().bindAppScript().withProps(props);
app.show();

