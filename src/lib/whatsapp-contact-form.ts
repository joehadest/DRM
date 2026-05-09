import { company } from './company'

const OUTRO_SERVICO = 'Outro (detalho na mensagem)'

export function getContactServiceOptions(): readonly string[] {
  return [...company.services, OUTRO_SERVICO]
}

export type ContactFormPayload = {
  name: string
  email: string
  message: string
  projectType: string[]
}

export function composeWhatsAppFromContactForm(data: ContactFormPayload): string {
  const services =
    data.projectType.length > 0
      ? data.projectType.map((s) => `• ${s}`).join('\n')
      : '(não informado)'

  let text = `Olá! Mensagem pelo formulário de contato do site — ${company.name}.

Nome: ${data.name.trim()}`

  const em = data.email.trim()
  if (em) {
    text += `\nE-mail: ${em}`
  }

  text += `

Serviços de interesse:
${services}

Mensagem:
${data.message.trim()}

Aguardo retorno. Obrigado(a)!`

  return text
}
