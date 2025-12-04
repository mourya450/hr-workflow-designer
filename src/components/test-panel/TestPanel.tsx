import { useState } from 'react'
import { useWorkflowContext } from '../../context/WorkflowProvider'
import { simulateWorkflow, type SimulationResult } from '../../api/simulate'

export default function TestPanel() {
  const { getGraph } = useWorkflowContext()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SimulationResult | null>(null)

  const handleRun = async () => {
    setLoading(true)
    try {
      const graph = getGraph()
      const res = await simulateWorkflow(graph)
      setResult(res)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="test-panel">
      <div className="test-panel-header">
        <h2>Workflow Sandbox</h2>
        <button className="btn primary" onClick={handleRun} disabled={loading}>
          {loading ? 'Simulating…' : 'Run Simulation'}
        </button>
      </div>

      {result && (
        <div className="test-panel-body">
          <div className={`status ${result.valid ? 'ok' : 'error'}`}>
            Status: {result.valid ? 'VALID' : 'INVALID'}
          </div>

          {result.errors.length > 0 && (
            <div className="errors">
              <h3>Errors</h3>
              <ul>
                {result.errors.map((err, idx) => (
                  <li key={idx}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="steps">
            <h3>Execution Steps</h3>
            {result.steps.map(step => (
              <div key={step.stepIndex} className="step">
                <strong>
                  Step {step.stepIndex + 1}: [{step.nodeType.toUpperCase()}] {step.nodeLabel}
                </strong>
                <div className="step-message">{step.message}</div>
              </div>
            ))}
          </div>

          <details>
            <summary>Raw Workflow JSON</summary>
            <pre>{JSON.stringify(getGraph(), null, 2)}</pre>
          </details>
        </div>
      )}
    </section>
  )
}
