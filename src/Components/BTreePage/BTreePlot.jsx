
import { Tree } from 'react-d3-tree';
import React, { useState, useEffect} from 'react';


const extraRectWidth = 10
const rectHeight = 30; // Height of the rectangle in pixels


//keeps track of the widest node width
let setBiggestWidthState = undefined
let biggestWidthGlobal = 0

//fill it with Node information as soon as available, to avoid 
//duplicate computations, Node Names serve as keys
let nodeDict = {}

//avoid duiplicate calculations
let textWidthDict = {}

function getTextWidth(text, font) {
  const span = document.createElement("span");
  span.style.font = font;
  span.style.visibility = "hidden";
  span.style.position = "absolute";
  span.textContent = text;
  document.body.appendChild(span);
  const width = span.clientWidth;
  document.body.removeChild(span);
  return width;
}

function textWidthCalculations(text){ 
  if (!textWidthDict.hasOwnProperty(text)) {
      textWidthDict[text] = getTextWidth(text, "Courier")
  }
  return textWidthDict[text]
}

//returns node_with and subnode with for a node key
function widthCalculations(keyStrings){
  if(keyStrings){
    // fill or use nodeDict to avoid duplicate Information
    let rectWidth, sub_node_width
    if (!nodeDict.hasOwnProperty(keyStrings)) {
      const longestKeyWidth = Math.max(...keyStrings.map(keyString => textWidthCalculations(keyString)));
      rectWidth = longestKeyWidth * keyStrings.length + (extraRectWidth * keyStrings.length)
      sub_node_width = rectWidth / keyStrings.length
      nodeDict[keyStrings] = {
        rectWidth: rectWidth,
        sub_node_width: sub_node_width
      };
      if(rectWidth > biggestWidthGlobal){
        if(setBiggestWidthState != undefined){
            setBiggestWidthState(rectWidth)
        }
        biggestWidthGlobal = rectWidth
      }
    }
    else{
      rectWidth = nodeDict[keyStrings].rectWidth
      sub_node_width = nodeDict[keyStrings].sub_node_width
    }
    return [rectWidth, sub_node_width]
  }
return [0,0]
}


//Customized Node rendering
const renderBTreeNode = ({nodeDatum, toggleNode }) => {

    const keyStrings = nodeDatum.name
    const [rectWidth, sub_node_width] = widthCalculations(nodeDatum.name);


    // generate key-strings and separator lines elements
    const separator_elements = []
    const key_elements = []
    
    let xOffset = -rectWidth / 2 
    for (let i in keyStrings) {
        key_elements.push(
        <text 
        fill="black" 
        strokeWidth="1" 
        x={xOffset + (sub_node_width / 2 ) - (textWidthCalculations(keyStrings[i]) / 2) } 
        y={rectHeight /1.5}
        key = {String(nodeDatum.name)+"Text"+String(i)}
        >
          {keyStrings[i]}
        </text>
        )

        if (i != 0){
            separator_elements.push(
                <line
                key={`sep-${i}`}
                x1={xOffset}
                y1={0}
                x2={xOffset}
                y2={rectHeight}
                stroke="black"
                />
            )
        }
          xOffset += sub_node_width
      }
  
    return (
      <g>
        <rect width={rectWidth} height={rectHeight} x={-rectWidth / 2} 
            fill = 'white'
            key = {String(nodeDatum.name)}
            strokeWidth = '2'
        />
        {separator_elements}
        {key_elements}
      </g>
    );
  };

  //Customizes anchor points of the lines
  const bTreePathFunc = (linkDatum, orientation) => {
    const { source, target } = linkDatum;
    
    const [rectWidth, sub_node_width] = widthCalculations(source.data.name);

    let xOffset =  - rectWidth / 2
    //if target is the nth child, move anchor to the right by n*subnode_width
    const sourceChildrenNames = source.children.map(function(node) {
      return node.data.name;
    });
    const targetIndex = sourceChildrenNames.indexOf(target.data.name);
    xOffset += sub_node_width * targetIndex

    return `M${source.x + xOffset},${source.y + rectHeight}` + //source anchor
           `L${target.x},${target.y}`; //target anchor
};

export default function BTreePlot({treeData, treeProps, plotProps}) {

    //cleanup for global variables
    useEffect(() => {
      // This is the cleanup function, runs when the component unmounts
      return () => {
        setBiggestWidthState = undefined
        biggestWidthGlobal = 0
        nodeDict = {}
        textWidthDict = {}
      };
    }, []);

    //State, so that the Tree rerenders if we get a new biggestWidth
    const [biggestWidth, setBiggestWidth] = useState(0);

    //setting the state as global variables for the Node Render Function to use
    setBiggestWidthState = setBiggestWidth
    biggestWidthGlobal = 0
    
    const nodeSize = {x: biggestWidth + 10, y: rectHeight * 3}

    return (
        <Tree
          data={treeData}
          orientation='vertical'
          collapsible={false}
          renderCustomNodeElement={renderBTreeNode}
          pathFunc={bTreePathFunc}
          nodeSize={nodeSize}
          scaleExtent={{max : 5, min :0.05}}
          separation={{nonSiblings: 1, siblings:1}}
          translate={{x: plotProps.plotWidth / 2, y: plotProps.plotHeight/4}}
          zoom={1.5}
        />
    );
  }


