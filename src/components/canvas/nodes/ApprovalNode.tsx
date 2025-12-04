import type { NodeProps } from 'reactflow'
import { Handle, Position } from 'reactflow'
import type { ApprovalNodeData } from '../../../types/workflow'

export default function ApprovalNode({ data }: NodeProps<ApprovalNodeData>) {
  return (
    <div className="node-card approval-node">
      <div className="node-title">{data.label || 'Approval'}</div>
      {data.approverRole && <div className="node-body">Role: {data.approverRole}</div>}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}
