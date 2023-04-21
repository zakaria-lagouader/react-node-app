import React from 'react'


function Sidebar() {

    const onDragStart = (event, nodeData) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeData));
        event.dataTransfer.effectAllowed = 'move';
    };

  return (
    <div className="Sidebar">
        <h2>Select Component</h2>
        <div className="Components-List">
            <div className='Component-Item' onDragStart={(event) => onDragStart(event, { type: "custom1", label:  "Item 1" })} style={{ backgroundColor: "cornflowerblue" }} draggable>
                Item 1
            </div>
            <div className='Component-Item' onDragStart={(event) => onDragStart(event, { type: "custom2", label:  "Item 2" })} style={{ backgroundColor: "coral" }} draggable>
                Item 2
            </div>
            <div className='Component-Item' onDragStart={(event) => onDragStart(event, { type: "custom3", label:  "Item 3" })} style={{ backgroundColor: "crimson" }} draggable>
                Item 3
            </div>
        </div>
    </div>
  )
}

export default Sidebar