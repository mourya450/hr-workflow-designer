import { WorkflowProvider } from './context/WorkflowProvider'
import Shell from './components/layout/Shell'

export default function App() {
  return (
    <WorkflowProvider>
      <Shell />
    </WorkflowProvider>
  )
}
