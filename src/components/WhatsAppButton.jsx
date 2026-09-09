import { WhatsappLogo } from '@phosphor-icons/react';

export default function WhatsAppButton() {
  return <a className="whatsapp-float" href="https://wa.me/8801339910397" target="_blank" rel="noopener noreferrer" aria-label="Chat with Base Plan Architects on WhatsApp (opens in a new tab)">
    <span className="whatsapp-pulse" aria-hidden="true" />
    <WhatsappLogo size={32} weight="regular" aria-hidden="true" />
    <span className="whatsapp-label">Chat on WhatsApp</span>
  </a>;
}
