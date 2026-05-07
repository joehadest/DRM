export function toE164BR(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  // Ex: "(81) 9 8848-1560" -> "81988481560" (11 dígitos: DDD + 9 + número)
  return digits.startsWith('55') ? digits : `55${digits}`
}

export function buildWhatsAppLink(phone: string, message?: string): string {
  const e164 = toE164BR(phone)
  const text = message ? `?text=${encodeURIComponent(message)}` : ''
  return `https://wa.me/${e164}${text}`
}

export function buildInstagramLink(handle: string): string {
  const normalized = handle.replace(/^@/, '')
  return `https://instagram.com/${normalized}`
}

