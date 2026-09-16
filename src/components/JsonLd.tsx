/**
 * Renders one JSON-LD <script> tag. Server-rendered, so the structured
 * data is present in the HTML response like everything else on the site.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
