import React, { createContext, useContext, useState, type ReactNode } from 'react'
import type { WorkflowNode, WorkflowEdge, WorkflowGraph, WorkflowNodeData } from '../types/workflow'

interface WorkflowContextValue {
  nodes: WorkflowNode[]
  edges: WorkflowEdge[]
  selectedNodeId?: string
  setNodes: (updater: (nodes: WorkflowNode[]) => WorkflowNode[]) => void
  setEdges: (updater: (edges: WorkflowEdge[]) => WorkflowEdge[]) => void
  selectNode: (id?: string) => void
  updateNodeData: (id: string, updater: (data: WorkflowNodeData) => WorkflowNodeData) => void
  getGraph: () => WorkflowGraph
}

const WorkflowContext = createContext<WorkflowContextValue | undefined>(undefined)

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [nodes, setNodesState] = useState<WorkflowNode[]>([])
  const [edges, setEdgesState] = useState<WorkflowEdge[]>([])
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>()

  const setNodes = (updater: (nodes: WorkflowNode[]) => WorkflowNode[]) => {
    setNodesState(prev => updater(prev))
  }

  const setEdges = (updater: (edges: WorkflowEdge[]) => WorkflowEdge[]) => {
    setEdgesState(prev => updater(prev))
  }

  const selectNode = (id?: string) => {
    setSelectedNodeId(id)
  }

  const updateNodeData = (id: string, updater: (data: WorkflowNodeData) => WorkflowNodeData) => {
    setNodesState(prev =>
      prev.map(node => (node.id === id ? { ...node, data: updater(node.data) } : node)),
    )
  }

  const getGraph = (): WorkflowGraph => ({ nodes, edges })

  return (
    <WorkflowContext.Provider
      value={{
        nodes,
        edges,
        selectedNodeId,
        setNodes,
        setEdges,
        selectNode,
        updateNodeData,
        getGraph,
      }}
    >
      {children}
    </WorkflowContext.Provider>
  )
}

export function useWorkflowContext() {
  const ctx = useContext(WorkflowContext)
  if (!ctx) throw new Error('useWorkflowContext must be used inside WorkflowProvider')
  return ctx
}
