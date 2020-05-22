export default function checkValidSlug(slug: string): boolean {
  return !/[^-\w]/gi.test(slug);
}
