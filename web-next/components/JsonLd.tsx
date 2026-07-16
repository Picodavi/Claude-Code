// Inserta datos estructurados (schema.org) en el HTML para SEO.
// Server component: se pre-renderiza, así lo lee Google directamente.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
