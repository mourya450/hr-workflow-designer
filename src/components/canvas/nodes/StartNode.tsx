import type { NodeProps } from 'reactflow'
import { Handle, Position } from 'reactflow'
import type { StartNodeData } from '../../../types/workflow'

export default function StartNode({ data }: NodeProps<StartNodeData>) {
  return (
    <div className="node-card start-node">
      <div className="node-title">{data.label || 'Start'}</div>
      <div className="node-type">Start</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
