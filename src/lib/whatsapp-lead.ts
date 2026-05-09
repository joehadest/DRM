import { company } from './company'

/** Valor da opção "Outro" no select de serviços (value do `<option>`). */
export const WHATSAPP_OTHER_SERVICE_VALUE = '__outro__'

/** Rótulo exibido e enviado na mensagem quando o usuário escolhe outro serviço. */
export const WHATSAPP_OTHER_SERVICE_LABEL =
  'Outro / orçamento geral (descrevo abaixo)'

export function composeWhatsAppLeadMessage(
  serviceLabel: string,
  userNote?: string,
): string {
  const trimmed = userNote?.trim()
  let body = `Olá! Vim pelo site da ${company.name}.

Serviço de interesse: ${serviceLabel}`

  if (trimmed) {
    body += `

Minha mensagem:
${trimmed}`
  }

  body += `

Gostaria de mais informações e, se possível, um orçamento.
Obrigado(a)!`

  return body
}
