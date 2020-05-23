export default function checkValidSlug(slug: string): boolean {
  return !/[^-\w]|\b\w\b/gi.test(slug);
}
