/**
 * This was originally created to map uits to each other, then extracted 
 * for use in Fabricate (fab on the cli)
 * 
 * About the same code as this;
 * https://github.com/adligo/acp_solutions.py.adligo.com/blob/main/identification/IdentifyUpstreamOriginNodes/answerFinal.py
 *
 * https://adligo.github.io/papers.adligo.com/algorithms/concrete/AdjacencyMatrixWithBitSlotMapsCreation.html
 * 
 */

export interface I_AdjacencyMap {
  getAllNodes(): string[];
  getEdges(fromNodeId:string): string[];
}

export class AdjacencyMapMutant implements I_AdjacencyMap{
  directional: boolean = true;
  nodeIdMap: Map<string,Set<string>> = new Map();

  constructor(directional: boolean |  null) {
    if (directional !== null) {
      this.directional = directional;
    }
  }

  addNode(nodeId:string): AdjacencyMapMutant { 
    if (this.nodeIdMap.has(nodeId)) {
      return;
    }
    this.nodeIdMap.set(nodeId, new Set());
    return this;
  }

  addEdge(fromNodeId:string, toNodeId:string): AdjacencyMapMutant { 
    if (this.nodeIdMap.has(fromNodeId)) {
      this.nodeIdMap.get(fromNodeId)!.add(toNodeId);
    } else {
      let s: Set<string> = new Set();
      s.add(toNodeId);
      this.nodeIdMap.set(fromNodeId, s);
    }
    return this;
  }

  getAllNodes(): string[] {
    //defensive copy
    return Array.from(this.nodeIdMap.keys());   
  }

  getEdges(fromNodeId:string): string[] {
    if (this.nodeIdMap.has(fromNodeId)) {
      //defensive copy
      return Array.from(this.nodeIdMap.get(fromNodeId)!);
    }
    return [];
  }
}

export class AdjacencyBitSlotMatrixMutant {
  /**
   * really an int
   */
  counter: number = 0;
  /**
   * value is an int
   */
  keyToId: Map<string, number> = new Map();
  /**
   * key is an int
   */
  idToKey: Map<number, string> = new Map();
  /**
   * key is an int, value is a BitSlotMap
   */
  rowMap: Map<number, number> = new Map();
  /**
   * key is an int, value is a BitSlotMap
   */
  colMap: Map<number, number> = new Map();

  constructor(adjacencyMap: I_AdjacencyMap) {
    let allNodes = adjacencyMap.getAllNodes();
    for (let i = 0; i < allNodes.length; i++) {
      this.keyToId.set(allNodes[i], this.counter);
      this.idToKey.set(this.counter, allNodes[i]);
      this.counter++;
    }

    let size = allNodes.length;
    for (let i = 0; i < size; i++) {
      this.colMap.set(i,0);
    }

    for (let i = 0; i < allNodes.length; i++) {
      let nodeName : string = allNodes[i];
      let nodeIntId : number = this.keyToId.get(nodeName);
      var row : number = 0;

      let edgeNames = adjacencyMap.getEdges(nodeName);
      for (let j = 0; j < edgeNames.length; j++) {
        let edgeName : string = edgeNames[j];
        let edgeIntId : number  = this.keyToId.get(edgeName);
        row |= 1 << edgeIntId;
        let col : number = this.colMap.get(edgeIntId);
        
        col |= 1 << nodeIntId;
        this.colMap.set(edgeIntId, col);
      }
      this.rowMap.set(nodeIntId, row);
    }
  }

  /**
   * pads to the right
   * @param str 
   * @param width 
   * @returns 
   */
  pad(str: string, width: number): string {
    let r = str;
    while (r.length < width) {
      r =  r + " ";
    }
    return r;
  }

  toString(): string {
    var sb = "\n\nStart AdjacencyBitSlotMatrixMutant.toString\nKeys;"; 
    let keys: MapIterator<string> = this.keyToId.keys();
    var maxIdStrWidth = 1;
    for (var i = 0; i < this.counter; i++) {
      let iStr = "" + i;
      sb += iStr + " -> '" + this.idToKey.get(i) + "';\n";
      if (iStr.length > maxIdStrWidth) {
        maxIdStrWidth = iStr.length;
      }
    }
    sb += "\n\n\nAs Rows\n";
    var line = this.pad("", maxIdStrWidth);
    for (var i = 0; i < this.counter; i++) {
      line += this.pad("" + i, maxIdStrWidth);
    }
    sb += line + "\n";
    for (var i = 0; i < this.counter; i++) {
      line = this.pad("" + i, maxIdStrWidth);

    }

    for (var i = 0; i < this.counter; i++) {
      let row = this.rowMap.get(i);
      let rowStr = "" + row;
      sb += this.pad(this.idToKey.get(i), maxIdStrWidth) + " " + rowStr + "\n";
    }

    //
    sb += "\n\n\nAs Colums";

    sb += "\nEnd AdjacencyBitSlotMatrixMutant.toString";
    return sb;
  }


}