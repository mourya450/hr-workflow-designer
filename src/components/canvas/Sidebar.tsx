import { useCallback } from 'react'
import { useWorkflowContext } from '../../context/WorkflowProvider'
import type { WorkflowNodeData, WorkflowNode } from '../../types/workflow'

let idCounter = 1
const getId = () => `node_${idCounter++}`

function createNode(type: WorkflowNodeData['type']): WorkflowNode {
  const id = getId()
  const base = {
    id,
    position: { x: Math.random() * 250, y: Math.random() * 250 },
  }

  switch (type) {
    case 'start':
      return {
        ...base,
        type: 'start',
        data: {
          id,
          type: 'start',
          label: 'Start',
          metadata: {},
        },
      }
    case 'task':
      return {
        ...base,
        type: 'task',
        data: {
          id,
          type: 'task',
          label: 'Task',
          description: '',
          assignee: '',
          dueDate: '',
          customFields: {},
        },
      }
    case 'approval':
      return {
        ...base,
        type: 'approval',
        data: {
          id,
          type: 'approval',
          label: 'Approval',
          approverRole: '',
          autoApproveThreshold: undefined,
        },
      }
    case 'automated':
      return {
        ...base,
        type: 'automated',
        data: {
          id,
          type: 'automated',
          label: 'Automated Step',
          actionId: undefined,
          params: {},
        },
      }
    case 'end':
      return {
        ...base,
        type: 'end',
        data: {
          id,
          type: 'end',
          label: 'End',
          endMessage: '',
          summaryFlag: false,
        },
      }
  }
}

export default function Sidebar() {
  const { setNodes } = useWorkflowContext()

  const handleAdd = useCallback(
    (type: WorkflowNodeData['type']) => {
      setNodes(prev => [...prev, createNode(type)])
    },
    [setNodes],
  )

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">Node Palette</h2>
      <p className="sidebar-subtitle">Add steps to your HR workflow.</p>

      <button className="btn" onClick={() => handleAdd('start')}>
        Start Node
      </button>
      <button className="btn" onClick={() => handleAdd('task')}>
        Task Node
      </button>
      <button className="btn" onClick={() => handleAdd('approval')}>
        Approval Node
      </button>
      <button className="btn" onClick={() => handleAdd('automated')}>
        Automated Step
      </button>
      <button className="btn" onClick={() => handleAdd('end')}>
        End Node
      </button>
    </aside>
  )
}
