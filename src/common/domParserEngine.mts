
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
   * <_Loop name="UITName" show={showMyThing, true} props={uitPropList} />
   * <_Loop name="MyThing" seperator="OtherUITName" show={showMyThing, true} props={uitPropList} />
   * </div>
   * </code></pre>
   * 
   * Hidden Loops will have a embed tag set in there place;
   * <embed id="uitPathId" style="visibility: hidden;" />
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
   * $this gets replaced in attributes with a presenter adapter lookup;
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
   * Note show is basically a bolean like visible, but if it's false the component gets replaced 
   * with a <div style="hidden" />.  
   * 
   * By default UITs are visible
   * <MyThing show={showMyThing} props={myProps} />
   * 
   * By default UITs are visible, they may also be toggled and have a defalut visibility of false;
   * <MyThing show={showMyThing, true} props={myProps} />
   * <MyThing show={showMyThing, false} props={myProps} />
   * 
   * Hidden UITs will have a embed tag set in there place;
   * <embed id="uitPathId" style="visibility: hidden;" />
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