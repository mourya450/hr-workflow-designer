import { useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type NodeTypes,
} from 'reactflow'
import 'reactflow/dist/style.css'

import { useWorkflowContext } from '../../context/WorkflowProvider'
import type { WorkflowNode, WorkflowEdge } from '../../types/workflow'

import StartNode from './nodes/StartNode'
import TaskNode from './nodes/TaskNode'
import ApprovalNode from './nodes/ApprovalNode'
import AutomatedNode from './nodes/AutomatedNode'
import EndNode from './nodes/EndNode'

const nodeTypes: NodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
}

export default function WorkflowCanvas() {
  const { nodes, edges, setNodes, setEdges, selectNode } = useWorkflowContext()

  const onNodesChange = useCallback<OnNodesChange>(
    changes => {
      setNodes(nds => applyNodeChanges(changes, nds as WorkflowNode[]))
    },
    [setNodes],
  )

  const onEdgesChange = useCallback<OnEdgesChange>(
    changes => {
      setEdges(eds => applyEdgeChanges(changes, eds as WorkflowEdge[]))
    },
    [setEdges],
  )

  const onConnect = useCallback<OnConnect>(
    connection => {
      setEdges(eds => addEdge(connection, eds as WorkflowEdge[]))
    },
    [setEdges],
  )

  const onNodeClick = useCallback(
    (_: any, node: WorkflowNode) => {
      selectNode(node.id)
    },
    [selectNode],
  )

  return (
    <div className="canvas-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background variant="dots" gap={16} size={1} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
