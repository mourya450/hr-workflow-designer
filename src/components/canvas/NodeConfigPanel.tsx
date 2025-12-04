import { useMemo, useState } from 'react'
import { useWorkflowContext } from '../../context/WorkflowProvider'
import type { WorkflowNodeData } from '../../types/workflow'
import { getAutomations, type AutomationAction } from '../../api/automations'

export default function NodeConfigPanel() {
  const { nodes, selectedNodeId, updateNodeData } = useWorkflowContext()
  const [automations, setAutomations] = useState<AutomationAction[] | null>(null)

  const selectedNode = useMemo(
    () => nodes.find(n => n.id === selectedNodeId),
    [nodes, selectedNodeId],
  )

  if (!selectedNode) {
    return (
      <aside className="config-panel">
        <h2>Node Config</h2>
        <p>Select a node to edit its configuration.</p>
      </aside>
    )
  }

  const data = selectedNode.data

  const handleChange = (updater: (data: WorkflowNodeData) => WorkflowNodeData) => {
    updateNodeData(selectedNode.id, updater)
  }

  const ensureAutomationsLoaded = async () => {
    if (!automations) {
      const res = await getAutomations()
      setAutomations(res)
    }
  }

  return (
    <aside className="config-panel">
      <h2>Edit Node</h2>
      <p className="config-type">Type: {data.type.toUpperCase()}</p>

      {/* common label */}
      <div className="form-group">
        <label>Title</label>
        <input
          value={data.label}
          onChange={e =>
            handleChange(d => ({ ...d, label: e.target.value } as WorkflowNodeData))
          }
        />
      </div>

      {data.type === 'start' && (
        <div className="form-group">
          <label>Metadata (key=value, comma separated)</label>
          <input
            placeholder="source=ATS,priority=high"
            onChange={e => {
              const input = e.target.value
              const metadata: Record<string, string> = {}
              input.split(',').forEach(pair => {
                const [k, v] = pair.split('=')
                if (k && v) metadata[k.trim()] = v.trim()
              })
              handleChange(d => ({ ...d, metadata } as WorkflowNodeData))
            }}
          />
        </div>
      )}

      {data.type === 'task' && (
        <>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={data.description ?? ''}
              onChange={e =>
                handleChange(d => ({ ...d, description: e.target.value } as WorkflowNodeData))
              }
            />
          </div>
          <div className="form-group">
            <label>Assignee</label>
            <input
              value={data.assignee ?? ''}
              onChange={e =>
                handleChange(d => ({ ...d, assignee: e.target.value } as WorkflowNodeData))
              }
            />
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              value={data.dueDate ?? ''}
              onChange={e =>
                handleChange(d => ({ ...d, dueDate: e.target.value } as WorkflowNodeData))
              }
            />
          </div>
        </>
      )}

      {data.type === 'approval' && (
        <>
          <div className="form-group">
            <label>Approver Role</label>
            <input
              value={data.approverRole}
              onChange={e =>
                handleChange(
                  d => ({ ...d, approverRole: e.target.value } as WorkflowNodeData),
                )
              }
            />
          </div>
          <div className="form-group">
            <label>Auto Approve Threshold</label>
            <input
              type="number"
              value={data.autoApproveThreshold ?? ''}
              onChange={e =>
                handleChange(d => {
                  const value = e.target.value
                  return {
                    ...d,
                    autoApproveThreshold: value ? Number(value) : undefined,
                  } as WorkflowNodeData
                })
              }
            />
          </div>
        </>
      )}

      {data.type === 'automated' && (
        <>
          <div className="form-group">
            <label>Action</label>
            <select
              value={data.actionId ?? ''}
              onFocus={ensureAutomationsLoaded}
              onChange={e => {
                const actionId = e.target.value || undefined
                handleChange(d => ({ ...d, actionId } as WorkflowNodeData))
              }}
            >
              <option value="">Select action</option>
              {automations?.map(a => (
                <option key={a.id} value={a.id}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Params (key=value, comma separated)</label>
            <input
              placeholder="to=hr@example.com,subject=Welcome"
              onChange={e => {
                const input = e.target.value
                const params: Record<string, string> = {}
                input.split(',').forEach(pair => {
                  const [k, v] = pair.split('=')
                  if (k && v) params[k.trim()] = v.trim()
                })
                handleChange(d => ({ ...d, params } as WorkflowNodeData))
              }}
            />
          </div>
        </>
      )}

      {data.type === 'end' && (
        <>
          <div className="form-group">
            <label>End Message</label>
            <input
              value={data.endMessage ?? ''}
              onChange={e =>
                handleChange(d => ({ ...d, endMessage: e.target.value } as WorkflowNodeData))
              }
            />
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={data.summaryFlag}
                onChange={e =>
                  handleChange(d => ({ ...d, summaryFlag: e.target.checked } as WorkflowNodeData))
                }
              />
              Include Summary
            </label>
          </div>
        </>
      )}
    </aside>
  )
}
