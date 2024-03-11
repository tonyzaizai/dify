import type {
  Edge as ReactFlowEdge,
  Node as ReactFlowNode,
} from 'reactflow'
import type { ToolDefaultValue } from '@/app/components/workflow/block-selector/types'

export enum BlockEnum {
  Start = 'start',
  End = 'end',
  DirectAnswer = 'direct-answer',
  LLM = 'llm',
  KnowledgeRetrieval = 'knowledge-retrieval',
  QuestionClassifier = 'question-classifier',
  IfElse = 'if-else',
  Code = 'code',
  TemplateTransform = 'template-transform',
  HttpRequest = 'http-request',
  VariableAssigner = 'variable-assigner',
  Tool = 'tool',
}

export type Branch = {
  id: string
  name: string
}

export type CommonNodeType<T = {}> = {
  _targetBranches?: Branch[]
  _isSingleRun?: boolean
  _runningStatus?: NodeRunningStatus
  selected?: boolean
  title: string
  desc: string
  type: BlockEnum
} & T & Partial<Pick<ToolDefaultValue, 'provider_id' | 'provider_type' | 'provider_name' | 'tool_name'>>

export type CommonEdgeType = {
  _hovering: boolean
  _connectedNodeIsHovering: boolean
}

export type Node<T = {}> = ReactFlowNode<CommonNodeType<T>>
export type SelectedNode = Pick<Node, 'id' | 'data'>
export type NodeProps<T = unknown> = { id: string; data: CommonNodeType<T> }
export type NodePanelProps<T> = {
  id: string
  data: CommonNodeType<T>
}
export type Edge = ReactFlowEdge<CommonEdgeType>

export type ValueSelector = string[] // [nodeId, key | obj key path]

export type Variable = {
  variable: string
  value_selector: ValueSelector
}

export type VariableWithValue = {
  key: string
  value: string
}

export enum InputVarType {
  textInput = 'text-input',
  paragraph = 'paragraph',
  select = 'select',
  number = 'number',
  url = 'url',
  files = 'files',
  contexts = 'contexts', // knowledge retrieval
}

export type InputVar = {
  type: InputVarType
  label: string
  variable: string
  max_length?: number
  default?: string
  required: boolean
  hint?: string
  options?: string[]
}

export type ModelConfig = {
  provider: string
  name: string
  mode: string
  completion_params: Record<string, any>
}

export enum PromptRole {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
}

export type PromptItem = {
  role?: PromptRole
  text: string
}

export enum MemoryRole {
  user = 'user',
  assistant = 'assistant',
}

export type RolePrefix = {
  user: string
  assistant: string
}

export type Memory = {
  role_prefix?: RolePrefix
  window: {
    enabled: boolean
    size: number | string | null
  }
}

export type Var = {
  variable: string
  type: string
  children?: Var[] // if type is obj, has the children struct
}

export type NodeOutPutVar = {
  nodeId: string
  title: string
  vars: Var[]
}

export type Block = {
  classification?: string
  type: BlockEnum
  title: string
  description?: string
}

export type NodeDefault<T> = {
  defaultValue: Partial<T>
  getAvailablePrevNodes: () => BlockEnum[]
  getAvailableNextNodes: () => BlockEnum[]
}

export type OnSelectBlock = (type: BlockEnum, toolDefaultValue?: ToolDefaultValue) => void

export enum Mode {
  Editing = 'editing',
  Running = 'running',
}

export enum WorkflowRunningStatus {
  Waiting = 'waiting',
  Running = 'running',
  Succeeded = 'succeeded',
  Failed = 'failed',
  Stopped = 'stopped',
}

export enum NodeRunningStatus {
  Waiting = 'waiting',
  Running = 'running',
  Succeeded = 'succeeded',
  Failed = 'failed',
}