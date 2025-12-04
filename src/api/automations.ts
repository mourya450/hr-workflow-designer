export interface AutomationAction {
  id: string
  label: string
  params: string[]
}

const MOCK_AUTOMATIONS: AutomationAction[] = [
  { id: 'send_email', label: 'Send Email', params: ['to', 'subject'] },
  { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient'] },
]

export async function getAutomations(): Promise<AutomationAction[]> {
  await new Promise(res => setTimeout(res, 200))
  return MOCK_AUTOMATIONS
}
