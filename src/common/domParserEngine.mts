
/**
 * For parsing XML, HTML and SVG
 */

export enum ParsedNodeType {
  /**
   * all the arbitrary text related to javascript calls and regular text
   */
  ETC,
  /**
   * The _JS tag is basically for forms, to toggle when js is on 
   * <form>
   *   <_JS onSubmit="return $this.sendEvent(event, this);" />
   *   <_NO_JS action="/search" method="GET" />
   * </form>
   */
  JS,
  /**
   * The $loop text token can be included as innerText in another element like a div.
   * <pre><code>
   * <div>
   * $loop("UITName",visibleVal,uitPropList)
   * $loop("MyThing",visibleVal,uitPropList,attendantList)
   * </div>
   * </code></pre>
   */
  LOOP,
  /**
   * The _NO_JS tag is basically for forms, and rich ui events to toggle when js is off 
   * <form>
   *   <_JS onSubmit="return $this.sendEvent(event, this);" />
   *   <_NO_JS action="/search" method="GET" />
   * </form>
   */
  NO_JS,
  /**
   * $this gets replaced in attributes with a attendant adapter lookup;
   * window.Registry.MyAppName.lookup("uitId")
   * to this component by id
   * which is comprised of the AppName.ViewName.PanelName[panelIndex].ComponentName[componentIndex] etc
   * i.e. ClientApp.MainView.NavBar
   * or ClientApp.MainView.MainPanel.Card[3]
   */
  THIS,
    /**
   * The $id text token represents a UIT path id and gets replaced in attributes with a string that represents the 
   * UIT path id, which can be used to uniquly identify child elements to 
   * facilitate partial rendering i.e.;
   * <img id="$id.leftImg" onMouseEnter="$this.sendEvent('mouseEnter',event, this);" 
   *   onMouseLeave="$this.sendEvent('mouseLeave',event, this);" src="xyz" />
   */
  ID,
  /**
   * A UIT type is a user interface template, which may have a single props value passed down 
   * in the JSX style. However, props are passive values only (ideally just strings, booleans and numbers),
   * if you want something like reactivity pass in an attendant.
   * 
   * <MyThing />
   * or
   * <MyThing {myProps} />
   * or
   * <MyThing props={myProps} />
   * or
   * Note show is basically a bolean like visible, but if it's false the component gets ommitted 
   * from the DOM competely.  If the MyThing UIT provides an attendant it will be attached either
   * after rendering on the client, or after load in the client for server side rendered UITs. 
   * 
   * <MyThing show={showMyThing} props={myProps} />
   */
  UIT,
  /**
   * The $val text token gets replaced in innerText and attributes via the prop name;
   * <h1>$val(somePropName)</h1>
   * <div class="$val(someClassName)" >
   *   text etc
   * </div>
   */
  VAL 
}