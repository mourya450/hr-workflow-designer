import WorkflowCanvas from '../canvas/WorkflowCanvas'
import Sidebar from '../canvas/Sidebar'
import NodeConfigPanel from '../canvas/NodeConfigPanel'
import TestPanel from '../test-panel/TestPanel'

export default function Shell() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>HR Workflow Designer</h1>
        <p className="app-header-subtitle">
          Visual designer for HR workflows (onboarding, approvals, automation).
        </p>
      </header>
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <div className="canvas-wrapper">
            <WorkflowCanvas />
          </div>
          <TestPanel />
        </main>
        <NodeConfigPanel />
      </div>
    </div>
  )
}
