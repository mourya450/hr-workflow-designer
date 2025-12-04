import type { NodeProps } from 'reactflow'
import { Handle, Position } from 'reactflow'
import type { AutomatedNodeData } from '../../../types/workflow'

export default function AutomatedNode({ data }: NodeProps<AutomatedNodeData>) {
  return (
    <div className="node-card automated-node">
      <div className="node-title">{data.label || 'Automated Step'}</div>
      {data.actionId && <div className="node-body">Action: {data.actionId}</div>}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
