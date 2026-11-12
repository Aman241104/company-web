// Open the global consultation modal from anywhere (client only).
export const openConsult = (service = '') =>
  window.dispatchEvent(new CustomEvent('open-consult', { detail: { service } }))
