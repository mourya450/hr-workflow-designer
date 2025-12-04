import type { WorkflowGraph } from '../types/workflow'

export interface SimulationStep {
  stepIndex: number
  nodeId: string
  nodeLabel: string
  nodeType: string
  message: string
}

export interface SimulationResult {
  valid: boolean
  errors: string[]
  steps: SimulationStep[]
}

export async function simulateWorkflow(graph: WorkflowGraph): Promise<SimulationResult> {
  await new Promise(res => setTimeout(res, 300))

  const errors: string[] = []
  const { nodes, edges } = graph

  const startNodes = nodes.filter(n => n.data.type === 'start')
  if (startNodes.length === 0) {
    errors.push('No Start node found.')
  } else if (startNodes.length > 1) {
    errors.push('More than one Start node found.')
  }

  const endNodes = nodes.filter(n => n.data.type === 'end')
  if (endNodes.length === 0) {
    errors.push('No End node found.')
  }

  const steps: SimulationStep[] = []

  if (startNodes.length === 1) {
    const start = startNodes[0]
    const visited = new Set<string>()
    let current = start
    let stepIndex = 0

    while (current && !visited.has(current.id)) {
      visited.add(current.id)
      steps.push({
        stepIndex,
        nodeId: current.id,
        nodeLabel: current.data.label,
        nodeType: current.data.type,
        message: `Executing ${current.data.type.toUpperCase()} node "${current.data.label}"`,
      })

      const outgoing = edges.filter(e => e.source === current.id)
      if (outgoing.length === 0) break
      const nextId = outgoing[0].target
      const nextNode = nodes.find(n => n.id === nextId)
      if (!nextNode) {
        errors.push(`Edge from ${current.id} points to missing node ${nextId}`)
        break
      }
      current = nextNode
      stepIndex += 1
    }

    if (visited.size < nodes.length) {
      errors.push('Some nodes are not reachable from Start node.')
    }
  }

  const valid = errors.length === 0

  return { valid, errors, steps }
}
