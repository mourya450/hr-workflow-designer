import type { NodeProps } from 'reactflow'
import { Handle, Position } from 'reactflow'
import type { TaskNodeData } from '../../../types/workflow'

export default function TaskNode({ data }: NodeProps<TaskNodeData>) {
  return (
    <div className="node-card task-node">
      <div className="node-title">{data.label || 'Task'}</div>
      {data.description && <div className="node-body">{data.description}</div>}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
