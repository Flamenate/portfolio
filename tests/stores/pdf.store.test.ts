import { beforeEach, describe, expect, it } from 'vitest'
import { useAppStore } from '@/stores/app.store'
import { usePdfStore } from '@/stores/pdf.store'

const pdfs = () => usePdfStore.getState()

describe('opening a PDF from outside Gymnast', () => {
  beforeEach(() => {
    usePdfStore.setState(usePdfStore.getInitialState(), true)
    useAppStore.setState(useAppStore.getInitialState(), true)
  })

  it('opens Gymnast on the PDF and records it as most recent', () => {
    const resume = pdfs().recent[1]

    pdfs().openPdf(resume)

    expect(useAppStore.getState().apps.gymnast_pdf.state).toBe('open')
    expect(pdfs().recent[0].id).toBe(resume.id)
    expect(pdfs().requested?.id).toBe(resume.id)
  })

  it('makes a distinct request each time, even for the same PDF', () => {
    const resume = pdfs().recent[0]

    pdfs().openPdf(resume)
    const first = pdfs().requested
    pdfs().clearRequest()
    pdfs().openPdf(resume)

    expect(pdfs().requested).not.toBe(first)
  })
})
