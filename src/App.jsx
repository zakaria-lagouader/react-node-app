import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider,
  MarkerType,
} from 'reactflow';

import 'reactflow/dist/style.css';
import Sidebar from './Sidebar';
import { CustomNode1, CustomNode2, CustomNode3 } from "./CustomNodes"

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'this is node 1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'this is node 2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = {
  custom1: CustomNode1,
  custom2: CustomNode2,
  custom3: CustomNode3,
};

let id = 2;
const getId = () => `dndnode_${id++}`;

export default function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));

      // check if the dropped element is valid
      if (typeof nodeData === 'undefined' || !nodeData) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: nodeData.type,
        position,
        data: { label: nodeData.label },
      };

      setNodes((nds) => nds.concat(newNode));
    }, [reactFlowInstance]);

  return (
    <ReactFlowProvider>
      <div className="App">
        <div className="Diagrammes" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            defaultEdgeOptions={{ type: "step", markerStart: { type: MarkerType.Arrow } }}
            nodeTypes={nodeTypes}
            onNodeClick={(e, node) => {
              const name = prompt("Choose a name :")

              setNodes((nds) => {
                return nds.map(n => {
                  if(n.id == node.id) {
                    n.data = {
                      ...n.data,
                      label: name,
                    };
                  }

                  return n
                })
              })
            }}
          >
            <Controls />
            <MiniMap />
            <Background variant="dots" gap={12} size={1} />
          </ReactFlow>
        </div>
        <Sidebar />
      </div>
    </ReactFlowProvider>
  );
}