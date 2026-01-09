import { I_UIT, Registry, RegistryBuilder,UITBuilder } from "./common/templates.mjs";
import { ClientApp } from "./common/clientApp.mjs";

let rb = new RegistryBuilder();
rb.add(UITBuilder.of(ClientApp.MAIN_VIEW, "<div>Hello UIT World!</div>").build());

let app = new ClientApp(rb.build(), ClientApp.MAIN_VIEW);
app.show();
