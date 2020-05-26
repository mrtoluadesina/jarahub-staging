export default function checkValidSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/gi.test(slug);
}
