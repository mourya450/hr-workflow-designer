import type { NodeProps } from 'reactflow'
import { Handle, Position } from 'reactflow'
import type { EndNodeData } from '../../../types/workflow'

export default function EndNode({ data }: NodeProps<EndNodeData>) {
  return (
    <div className="node-card end-node">
      <div className="node-title">{data.label || 'End'}</div>
      {data.endMessage && <div className="node-body">{data.endMessage}</div>}
      <Handle type="target" position={Position.Top} />
    </div>
  )
}
