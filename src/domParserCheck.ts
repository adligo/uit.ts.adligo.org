import { isMissing, RegistryBuilder,UITBuilder } from "./common/templates.mjs";
import { ClientApp } from "./common/clientApp.mjs";
import { I_DomParser, DomParserType } from "./common/i_domParser.mjs";
import { ClientDomParser } from "./common/clientDomParser.mjs";

let rb : RegistryBuilder= new RegistryBuilder();
let DP_T = "DpT";
let parser: I_DomParser = new ClientDomParser();
let parserChecks: Map<string, boolean> = new Map();

async function checkParse(parserChecks: Map<string, boolean>, url: string, type) {
  const response = await fetch(url);
  if (!response.ok) {
    parserChecks.set(url, false);
    console.log("checkparse " + url + " failed");
    return;
  }
  let htmlString = await response.text();
  try {
    parser.parseFromString(htmlString, type);
    console.log("checkparse " + url + " succeeded");
    parserChecks.set(url, true);
  } catch (e) {
    console.log(e.message);
    console.log("checkparse " + url + " failed");
    parserChecks.set(url, false);
  }
  return;
}

await checkParse(parserChecks, "/index.html", DomParserType.HTML);
await checkParse(parserChecks, "/etc/books.xml", DomParserType.XML);
await checkParse(parserChecks, "/etc/camera.svg", DomParserType.SVG);
/**
 * serverStyleHtml is NOT a recommended way of doing this, 
 * but since the recommended way doesn't work at this point it's
 * a hack to do something similar;
 */
var serverStyleHtml = `
<div>
  <h1>DomParser client API check</h1>
  <h3> Output Checks </h3>
  <ul>
`;

for (let [key, value] of parserChecks) {
    serverStyleHtml += `<li>${key}: ${parserChecks.get(key) ? 'SUCCESS' : 'FAILED'}</li>\n`;
}

serverStyleHtml += `
  </ul>
</div>
`;
rb.add(UITBuilder.of(DP_T, serverStyleHtml).build());
console.log("creating ClientApp");
let app = new ClientApp(rb.build(), DP_T);

app.bindWindow().bindAppScript();
app.show();

