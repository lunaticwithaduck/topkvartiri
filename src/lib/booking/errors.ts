// Maps an RHF/Zod field error to an i18n key under the `validation.*` namespace.
// Most fields have a single meaningful failure, so we key off the field name; the
// cross-field date rule is the only one that carries an explicit Zod message.
export function validationKey(field: string, message?: string): string {
  if (message === 'departureAfterArrival') return 'departureAfterArrival';
  switch (field) {
    case 'email':
      return 'email';
    case 'phone':
      return 'phone';
    case 'consent':
      return 'consent';
    case 'roomId':
      return 'selectRoom';
    default:
      return 'required';
  }
}
