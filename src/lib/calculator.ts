import type { TranslationKey } from '@/lib/localize'

export const specialValues: Partial<Record<number, TranslationKey>> = {
  2026: 'calculator_year_france',
  2024: 'calculator_year_first_job',
  2022: 'calculator_year_first_freelance',
  2: 'calculator_experience_years',
  15: 'calculator_age_when_started_programming',
  16: 'calculator_age_first_published_bot',
  18: 'calculator_age_first_freelance',
  20: 'calculator_age_first_job',
}

export function specialValue(display: string) {
  const value = Number(display)
  if (!Number.isInteger(value)) return
  return specialValues[value]
}

export type Operator = '+' | '−' | '×' | '÷'

export type HistoryEntry = {
  id: number
  expression: string
  result: string
}

let nextHistoryId = 0

function historyEntry(expression: string, result: string): HistoryEntry {
  nextHistoryId += 1
  return { id: nextHistoryId, expression, result }
}

export type CalculatorState = {
  display: string
  expression: string
  left: number | null
  operator: Operator | null
  lastRight: number | null
  fresh: boolean
  error: string | null
  history: HistoryEntry[]
}

export type CalculatorAction =
  | { type: 'digit'; digit: string }
  | { type: 'decimal' }
  | { type: 'operator'; operator: Operator }
  | { type: 'equals' }
  | { type: 'ce' }
  | { type: 'clear' }
  | { type: 'backspace' }
  | { type: 'negate' }
  | { type: 'percent' }
  | { type: 'reciprocal' }
  | { type: 'square' }
  | { type: 'sqrt' }
  | { type: 'recall'; result: string }

const maxLength = 16

export const initialCalculatorState: CalculatorState = {
  display: '0',
  expression: '',
  left: null,
  operator: null,
  lastRight: null,
  fresh: true,
  error: null,
  history: [],
}

function parseDisplay(display: string) {
  const value = Number(display)
  return Number.isFinite(value) ? value : 0
}

export function formatNumber(value: number) {
  if (Object.is(value, -0)) return '0'
  const rounded = Number(value.toPrecision(12))
  const text = Object.is(rounded, -0) ? '0' : String(rounded)
  if (text.length <= maxLength) return text
  return value
    .toExponential(6)
    .replace(/\.0+e/, 'e')
    .replace(/(\.\d*?)0+e/, '$1e')
}

function evaluate(left: number, operator: Operator, right: number) {
  if (operator === '+') return left + right
  if (operator === '−') return left - right
  if (operator === '×') return left * right
  if (right === 0) return 'Cannot divide by zero'
  return left / right
}

function withResult(
  state: CalculatorState,
  value: number,
  expression: string,
  record: boolean,
): CalculatorState {
  if (!Number.isFinite(value))
    return { ...state, error: 'Overflow', expression }
  const display = formatNumber(value)
  const entry = historyEntry(expression, display)
  return {
    ...state,
    display,
    expression,
    left: value,
    operator: null,
    lastRight: null,
    fresh: true,
    error: null,
    history: record ? [entry, ...state.history] : state.history,
  }
}

function withPending(
  state: CalculatorState,
  value: number,
  operator: Operator,
): CalculatorState {
  if (!Number.isFinite(value)) return { ...state, error: 'Overflow' }
  const display = formatNumber(value)
  return {
    ...state,
    display,
    expression: `${display} ${operator}`,
    left: value,
    operator,
    fresh: true,
    error: null,
  }
}

function appendDigit(
  display: string,
  digit: string,
  fresh: boolean,
  isErrored: boolean,
) {
  if (fresh || isErrored) return digit
  const negative = display.startsWith('-')
  const body = negative ? display.slice(1) : display
  if (body === '0') return negative ? `-${digit}` : digit
  if (display.length >= maxLength) return display
  return display + digit
}

function applyToDisplay(
  state: CalculatorState,
  next: (value: number) => number | string,
): CalculatorState {
  if (state.error) return state
  const result = next(parseDisplay(state.display))
  if (typeof result === 'string') return { ...state, error: result }
  if (!Number.isFinite(result)) return { ...state, error: 'Overflow' }
  return { ...state, display: formatNumber(result), fresh: true, error: null }
}

export function calculatorReducer(
  state: CalculatorState,
  action: CalculatorAction,
): CalculatorState {
  switch (action.type) {
    case 'recall':
      return {
        ...state,
        display: action.result,
        expression: '',
        left: null,
        operator: null,
        lastRight: null,
        fresh: true,
        error: null,
      }
    case 'clear':
      return {
        ...initialCalculatorState,
        history: state.history,
      }
    case 'ce':
      return { ...state, display: '0', fresh: false, error: null }
    case 'digit':
      return {
        ...state,
        display: appendDigit(
          state.display,
          action.digit,
          state.fresh,
          Boolean(state.error),
        ),
        fresh: false,
        error: null,
      }
    case 'backspace': {
      if (state.fresh) return state
      if (state.error)
        return { ...initialCalculatorState, history: state.history }
      const next = state.display.slice(0, -1)
      const display = next === '' || next === '-' ? '0' : next
      return { ...state, display }
    }
    default:
      break
  }

  if (state.error) return state

  switch (action.type) {
    case 'decimal': {
      const display = state.fresh
        ? '0.'
        : state.display.includes('.') || state.display.length >= maxLength
          ? state.display
          : `${state.display}.`
      return { ...state, display, fresh: false }
    }
    case 'negate': {
      if (state.display === '0') return state
      const display = state.display.startsWith('-')
        ? state.display.slice(1)
        : `-${state.display}`
      return { ...state, display }
    }
    case 'operator': {
      const current = parseDisplay(state.display)
      if (state.operator && state.fresh && state.left !== null) {
        return {
          ...state,
          operator: action.operator,
          expression: `${state.expression.slice(0, -1)}${action.operator}`,
        }
      }
      if (state.operator && state.left !== null) {
        const result = evaluate(state.left, state.operator, current)
        if (typeof result === 'string') return { ...state, error: result }
        if (!Number.isFinite(result)) return { ...state, error: 'Overflow' }
        return {
          ...state,
          display: formatNumber(result),
          expression: `${state.expression} ${state.display} ${action.operator}`,
          left: result,
          operator: action.operator,
          lastRight: current,
          fresh: true,
          error: null,
        }
      }
      return withPending(state, current, action.operator)
    }
    case 'equals': {
      if (!state.operator || state.left === null) {
        if (state.expression.endsWith('=')) return state
        const expression = `${state.display} =`
        return {
          ...state,
          expression,
          fresh: true,
          left: parseDisplay(state.display),
          lastRight: null,
          history: [historyEntry(expression, state.display), ...state.history],
        }
      }
      const right = state.fresh
        ? (state.lastRight ?? state.left)
        : parseDisplay(state.display)
      const result = evaluate(state.left, state.operator, right)
      const rightText = state.fresh ? formatNumber(right) : state.display
      const expression = `${state.expression} ${rightText} =`
      if (typeof result === 'string')
        return { ...state, error: result, expression }
      return withResult(state, result, expression, true)
    }
    case 'percent': {
      const current = parseDisplay(state.display)
      if (!state.operator || state.left === null) {
        const value = current / 100
        return {
          ...state,
          display: formatNumber(value),
          expression: `${formatNumber(current)}%`,
          left: value,
          fresh: true,
        }
      }
      const right =
        state.operator === '+' || state.operator === '−'
          ? state.left * (current / 100)
          : current / 100
      const result = evaluate(state.left, state.operator, right)
      const expression = `${state.expression} ${formatNumber(current)}%`
      if (typeof result === 'string')
        return { ...state, error: result, expression }
      return withResult(state, result, expression, false)
    }
    case 'reciprocal':
      return applyToDisplay(state, (value) =>
        value === 0 ? 'Cannot divide by zero' : 1 / value,
      )
    case 'square':
      return applyToDisplay(state, (value) => value * value)
    case 'sqrt':
      return applyToDisplay(state, (value) =>
        value < 0 ? 'Invalid input' : Math.sqrt(value),
      )
    default:
      return state
  }
}
