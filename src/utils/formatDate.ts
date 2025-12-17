export function formatDate(iso: string): string {
  try {
    const d = new Date(iso)
    return d.toLocaleDateString()
  } catch (e) {
    return iso
  }
}
