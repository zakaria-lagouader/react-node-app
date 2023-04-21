import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export const CustomNode1 = memo(({ data }) => {
  return (
    <div className='Node' style={{ backgroundColor: "cornflowerblue" }}>
        <span>{ data.label }</span>
        <Handle type="target" position={Position.Top} />
        <Handle type="source" position={Position.Bottom} />
    </div>
  )
})

export const CustomNode2 = memo(({ data }) => {
  return (
    <div className='Node' style={{ backgroundColor: "coral" }}>
        <span>{ data.label }</span>
        <Handle type="target" position={Position.Left} />
    </div>
  )
})

export const CustomNode3 = memo(({ data }) => {
  return (
    <div className='Node' style={{ backgroundColor: "crimson" }}>
        <span>{ data.label }</span>
        <Handle type="source" position={Position.Bottom} />
    </div>
  )
})
