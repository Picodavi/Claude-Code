// Contenido legal en ES y EN (arregla el bug: antes no se traducía al inglés).
import type { Lang } from "./i18n";

export type LegalBlock =
  | { type: "box"; text: string }
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type LegalDoc = {
  kicker: string;
  title: string;
  updated: string;
  blocks: LegalBlock[];
};

export type LegalKey = "aviso-legal" | "privacidad" | "cookies";

export const legal: Record<LegalKey, Record<Lang, LegalDoc>> = {
  "aviso-legal": {
    es: {
      kicker: "Legal",
      title: "Aviso legal",
      updated: "Última actualización: julio de 2026",
      blocks: [
        { type: "box", text: "Picodavi es una marca personal de David Picoiu (no es una sociedad) y está completando el alta censal de su actividad. Hasta que ese trámite finalice, esta web funciona como portfolio e información: no se aceptarán pagos ni se formalizarán encargos. El NIF y los datos fiscales definitivos se incorporarán aquí antes de iniciar la actividad." },
        { type: "h2", text: "1. Datos identificativos del titular" },
        { type: "p", text: "En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web:" },
        { type: "ul", items: [
          "Titular: David Picoiu («Picodavi» es nombre comercial / marca personal).",
          "NIF: pendiente de publicación hasta completar el alta censal, antes de iniciar la actividad profesional.",
          "Domicilio completo a efectos de notificaciones: pendiente de incorporar antes de iniciar la actividad. Localidad: Viladrau (Girona), 17406, Catalunya.",
          "Correo electrónico: picoiudavid@gmail.com",
          "Teléfono: 643 78 07 53",
          "Actividad: diseño y desarrollo de páginas web.",
        ] },
        { type: "h2", text: "2. Objeto" },
        { type: "p", text: "Este sitio web tiene como finalidad presentar los servicios de diseño y desarrollo web de Picodavi y facilitar el contacto con personas interesadas. El acceso y uso del sitio atribuye la condición de usuario e implica la aceptación de este aviso legal." },
        { type: "h2", text: "3. Condiciones de uso" },
        { type: "p", text: "El usuario se compromete a hacer un uso adecuado de los contenidos del sitio y a no emplearlos para actividades ilícitas, contrarias a la buena fe o que puedan dañar el sitio o a terceros. La información de precios y servicios es orientativa. Los precios publicados son importes base y no incluyen IVA; cuando se active la contratación, cualquier encargo se formalizará mediante un presupuesto que desglose base imponible, impuestos y total, y requerirá aceptación expresa." },
        { type: "h2", text: "4. Propiedad intelectual e industrial" },
        { type: "p", text: "Los textos, el diseño, el código y los elementos gráficos propios de este sitio pertenecen al titular o cuentan con licencia para su uso. Antes de publicar material de terceros se conserva la documentación de su licencia o autorización. No se permite la reproducción total o parcial de los contenidos propios sin autorización." },
        { type: "h2", text: "5. Responsabilidad" },
        { type: "p", text: "El titular no se hace responsable de los daños derivados de un uso indebido del sitio, ni garantiza la ausencia total de interrupciones o errores, aunque trabaja para minimizarlos." },
        { type: "h2", text: "6. Enlaces a sitios de terceros" },
        { type: "p", text: "Este sitio puede incluir enlaces a servicios de terceros (por ejemplo WhatsApp, correo electrónico o Instagram). El titular no se responsabiliza de los contenidos ni las políticas de dichos sitios." },
        { type: "h2", text: "7. Protección de datos" },
        { type: "p", text: "El tratamiento de los datos personales que facilites a través del formulario o de los canales de contacto se rige por la Política de privacidad y la Política de cookies." },
        { type: "h2", text: "8. Legislación aplicable" },
        { type: "p", text: "Este aviso legal se rige por la legislación española. Para cualquier controversia, salvo que la normativa de consumo establezca otro fuero, las partes se someten a los juzgados y tribunales que correspondan al domicilio del titular, en Viladrau (Catalunya)." },
      ],
    },
    en: {
      kicker: "Legal",
      title: "Legal notice",
      updated: "Last updated: July 2026",
      blocks: [
        { type: "box", text: "Picodavi is David Picoiu's personal brand (not a company) and its tax registration is being completed. Until that process is finished, this website serves as a portfolio and information page: no payments will be accepted and no projects will be formally commissioned. The tax ID and final tax details will be added here before professional activity begins." },
        { type: "h2", text: "1. Owner identification" },
        { type: "p", text: "In compliance with article 10 of Spanish Law 34/2002 on Information Society Services and Electronic Commerce (LSSI-CE), the details of the owner of this website are provided:" },
        { type: "ul", items: [
          "Owner: David Picoiu (“Picodavi” is a trade name / personal brand).",
          "Tax ID (NIF): pending publication until tax registration is complete, before professional activity begins.",
          "Full address for notifications: to be added before professional activity begins. Location: Viladrau (Girona), 17406, Catalonia.",
          "Email: picoiudavid@gmail.com",
          "Phone: 643 78 07 53",
          "Activity: web design and development.",
        ] },
        { type: "h2", text: "2. Purpose" },
        { type: "p", text: "This website aims to present Picodavi's web design and development services and to make it easier for interested people to get in touch. Accessing and using the site grants you the status of user and implies acceptance of this legal notice." },
        { type: "h2", text: "3. Terms of use" },
        { type: "p", text: "The user agrees to make appropriate use of the site's content and not to use it for unlawful activities, activities contrary to good faith, or activities that may harm the site or third parties. Price and service information is indicative. Published prices are base amounts and exclude VAT; once commissioning opens, each project will be formalised through a written quote showing the taxable base, taxes and total, with express acceptance." },
        { type: "h2", text: "4. Intellectual and industrial property" },
        { type: "p", text: "The texts, design, code and original graphic elements of this site belong to the owner or are licensed for use. Licence or authorisation records are kept before third-party material is published. Total or partial reproduction of original content is not permitted without authorisation." },
        { type: "h2", text: "5. Liability" },
        { type: "p", text: "The owner is not liable for damages arising from improper use of the site, nor does it guarantee the complete absence of interruptions or errors, although it works to minimise them." },
        { type: "h2", text: "6. Links to third-party sites" },
        { type: "p", text: "This site may include links to third-party services (for example WhatsApp, email or Instagram). The owner is not responsible for the content or policies of those sites." },
        { type: "h2", text: "7. Data protection" },
        { type: "p", text: "The processing of the personal data you provide through the form or the contact channels is governed by the Privacy policy and the Cookie policy." },
        { type: "h2", text: "8. Applicable law" },
        { type: "p", text: "This legal notice is governed by Spanish law. For any dispute, unless consumer regulations establish another jurisdiction, the parties submit to the courts corresponding to the owner's address, in Viladrau (Catalonia)." },
      ],
    },
  },

  privacidad: {
    es: {
      kicker: "Legal",
      title: "Política de privacidad",
      updated: "Última actualización: julio de 2026",
      blocks: [
        { type: "box", text: "Esta política describe cómo se tratan tus datos cuando contactas a través de la web: un formulario de contacto y los canales de contacto directo." },
        { type: "h2", text: "1. Responsable del tratamiento" },
        { type: "ul", items: [
          "Responsable: David Picoiu (marca personal «Picodavi»).",
          "NIF: pendiente de publicación hasta completar el alta censal, antes de iniciar la actividad profesional.",
          "Domicilio completo: pendiente de incorporar antes de iniciar la actividad. Localidad: Viladrau (Girona), 17406, Catalunya.",
          "Email: picoiudavid@gmail.com",
          "Teléfono: 643 78 07 53",
        ] },
        { type: "h2", text: "2. Qué datos trato y de dónde salen" },
        { type: "p", text: "Trato los datos que facilitas voluntariamente cuando contactas: a través del formulario de la web (nombre, qué necesitas y, si lo añades, el mensaje; el formulario no almacena esos datos en un servidor: prepara un texto y abre WhatsApp para que decidas si lo envías), o mediante WhatsApp, correo electrónico o Instagram (los datos que incluyas en esa conversación)." },
        { type: "p", text: "Al visitar la web, el proveedor de alojamiento puede procesar datos técnicos necesarios para servirla y protegerla, como la dirección IP, la fecha, el recurso solicitado y datos del navegador, conforme a su configuración de registros." },
        { type: "p", text: "No utilizo cookies de seguimiento ni de publicidad, ni elaboro perfiles. Consulta la Política de cookies para el detalle del almacenamiento técnico." },
        { type: "h2", text: "3. Para qué uso tus datos" },
        { type: "p", text: "Para responder a tu consulta y, si procede, preparar un presupuesto, y para mantener el contacto necesario para llevar a cabo el proyecto que me encargues. No uso tus datos para enviarte publicidad ni los cedo a terceros para fines comerciales." },
        { type: "h2", text: "4. Legitimación" },
        { type: "p", text: "La base legal para responder y preparar un presupuesto son las medidas precontractuales que solicitas al contactar. Si posteriormente existe un encargo, será la ejecución del contrato. Los registros técnicos del alojamiento se tratan para mantener la seguridad y el funcionamiento del sitio. Cualquier uso adicional que requiera consentimiento se activará solo después de obtenerlo." },
        { type: "h2", text: "5. Conservación" },
        { type: "p", text: "Conservo tus datos el tiempo necesario para atender tu solicitud y, si se convierte en un encargo, durante la relación profesional y los plazos legales aplicables. Después se eliminan o se anonimizan." },
        { type: "h2", text: "6. Destinatarios y encargados" },
        { type: "p", text: "La web y el contacto se apoyan en servicios de terceros: WhatsApp / Meta (si decides enviar el mensaje o escribes por WhatsApp), Google / Gmail (si escribes por correo) y Hostinger (alojamiento y registros técnicos). Las tipografías están autoalojadas y no generan peticiones a un proveedor externo. Antes de iniciar la actividad deberán revisarse y documentarse los contratos, la ubicación del tratamiento y, cuando proceda, las garantías de transferencias internacionales de cada proveedor." },
        { type: "h2", text: "7. Tus derechos" },
        { type: "p", text: "Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a picoiudavid@gmail.com, indicando qué derecho deseas ejercer. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es) si consideras que el tratamiento no es correcto." },
        { type: "h2", text: "8. Seguridad" },
        { type: "p", text: "El sitio se sirve mediante conexión cifrada (HTTPS) y se aplican medidas razonables para proteger la información. Ningún sistema es infalible, pero trabajo para mantener tus datos seguros." },
        { type: "h2", text: "9. Cambios en esta política" },
        { type: "p", text: "Esta política puede actualizarse si cambian los servicios o la normativa. La versión vigente será siempre la publicada en esta página." },
      ],
    },
    en: {
      kicker: "Legal",
      title: "Privacy policy",
      updated: "Last updated: July 2026",
      blocks: [
        { type: "box", text: "This policy describes how your data is handled when you get in touch through the website: a contact form and the direct contact channels." },
        { type: "h2", text: "1. Data controller" },
        { type: "ul", items: [
          "Controller: David Picoiu (personal brand “Picodavi”).",
          "Tax ID (NIF): pending publication until tax registration is complete, before professional activity begins.",
          "Full address: to be added before professional activity begins. Location: Viladrau (Girona), 17406, Catalonia.",
          "Email: picoiudavid@gmail.com",
          "Phone: 643 78 07 53",
        ] },
        { type: "h2", text: "2. What data I process and where it comes from" },
        { type: "p", text: "I process the data you voluntarily provide when you contact me: through the website form (your name, what you need and, if you add it, your message; the form does not store that data on a server: it prepares a text and opens WhatsApp so you can decide whether to send it), or through WhatsApp, email or Instagram (the data you include in that conversation)." },
        { type: "p", text: "When you visit the site, the hosting provider may process technical data needed to serve and protect it, such as your IP address, date, requested resource and browser information, according to its logging configuration." },
        { type: "p", text: "I do not use tracking or advertising cookies, and I do not build profiles. See the Cookie policy for details of the technical storage." },
        { type: "h2", text: "3. What I use your data for" },
        { type: "p", text: "To reply to your enquiry and, where appropriate, prepare a quote, and to keep the contact needed to carry out the project you commission. I do not use your data to send you advertising, nor do I share it with third parties for commercial purposes." },
        { type: "h2", text: "4. Legal basis" },
        { type: "p", text: "The legal basis for replying and preparing a quote is taking pre-contractual steps at your request. If a project is later commissioned, it is the performance of that contract. Technical hosting logs are processed to keep the site secure and operational. Any additional use that requires consent will only be enabled after obtaining it." },
        { type: "h2", text: "5. Retention" },
        { type: "p", text: "I keep your data for as long as needed to handle your request and, if it becomes a project, for the duration of the professional relationship and the applicable legal periods. Afterwards it is deleted or anonymised." },
        { type: "h2", text: "6. Recipients and processors" },
        { type: "p", text: "The website and contact channels rely on third-party services: WhatsApp / Meta (if you choose to send the prepared message or contact me on WhatsApp), Google / Gmail (if you email me) and Hostinger (hosting and technical logs). Fonts are self-hosted and make no request to an external font provider. Before professional activity begins, the contracts, processing locations and any applicable international-transfer safeguards for each provider must be reviewed and documented." },
        { type: "h2", text: "7. Your rights" },
        { type: "p", text: "You may exercise your rights of access, rectification, erasure, objection, restriction and portability at any time by writing to picoiudavid@gmail.com, stating which right you wish to exercise. You may also lodge a complaint with the Spanish Data Protection Agency (www.aepd.es) if you consider the processing to be incorrect." },
        { type: "h2", text: "8. Security" },
        { type: "p", text: "The site is served over an encrypted connection (HTTPS) and reasonable measures are applied to protect the information. No system is infallible, but I work to keep your data secure." },
        { type: "h2", text: "9. Changes to this policy" },
        { type: "p", text: "This policy may be updated if the services or regulations change. The current version will always be the one published on this page." },
      ],
    },
  },

  cookies: {
    es: {
      kicker: "Legal",
      title: "Política de cookies",
      updated: "Última actualización: julio de 2026",
      blocks: [
        { type: "box", text: "Esta web no instala cookies de publicidad o seguimiento ni carga herramientas de analítica. Solo guarda dos preferencias técnicas en el almacenamiento local de tu navegador." },
        { type: "h2", text: "1. ¿Qué son las cookies?" },
        { type: "p", text: "Son pequeños archivos o datos que una web guarda en tu navegador. Pueden servir para que el sitio recuerde tus preferencias, para medir visitas o para mostrar publicidad. La normativa solo exige tu consentimiento para las que no son estrictamente necesarias." },
        { type: "h2", text: "2. Qué usa exactamente esta web" },
        { type: "p", text: "Esta web utiliza únicamente este almacenamiento local técnico; no son cookies de seguimiento:" },
        { type: "ul", items: [
          "picodavi-lang — guarda tu idioma (español o inglés) para recordarlo en tu próxima visita. Técnica / necesaria.",
          "picodavi-motion — recuerda si has pedido reducir o activar el movimiento 3D. Preferencia técnica y de accesibilidad.",
          "Tipografías propias — las fuentes se sirven desde este mismo sitio (autoalojadas). No se hacen peticiones a servidores externos ni se instalan cookies al cargarlas.",
        ] },
        { type: "p", text: "No se utiliza Google Analytics, ni píxeles de redes sociales, ni cookies de publicidad." },
        { type: "h2", text: "3. Enlaces y servicios de terceros" },
        { type: "p", text: "Cuando pulsas el botón de WhatsApp, el correo o Instagram, sales de esta web hacia esos servicios, que tienen sus propias políticas de cookies y privacidad." },
        { type: "h2", text: "4. Cómo gestionar o borrar el almacenamiento" },
        { type: "p", text: "Puedes borrar el almacenamiento local y las cookies desde la configuración de tu navegador (Chrome, Safari, Edge o Firefox), en el apartado de privacidad o datos de navegación. Si lo borras, la web volverá al idioma y a la preferencia de movimiento iniciales." },
        { type: "h2", text: "5. Cambios" },
        { type: "p", text: "Si en el futuro se añaden herramientas que sí usen cookies no esenciales (por ejemplo analítica), se actualizará esta política y se pedirá tu consentimiento con opciones para aceptarlas o rechazarlas." },
      ],
    },
    en: {
      kicker: "Legal",
      title: "Cookie policy",
      updated: "Last updated: July 2026",
      blocks: [
        { type: "box", text: "This website sets no advertising or tracking cookies and loads no analytics tools. It stores only two technical preferences in your browser's local storage." },
        { type: "h2", text: "1. What are cookies?" },
        { type: "p", text: "They are small files or data that a website stores in your browser. They can be used to remember your preferences, measure visits or show advertising. The regulations only require your consent for those that are not strictly necessary." },
        { type: "h2", text: "2. What exactly this website uses" },
        { type: "p", text: "This website uses only the following technical local storage; these are not tracking cookies:" },
        { type: "ul", items: [
          "picodavi-lang — stores your language (Spanish or English) to remember it on your next visit. Technical / necessary.",
          "picodavi-motion — remembers whether you asked to reduce or enable 3D motion. Technical and accessibility preference.",
          "Self-hosted fonts — the fonts are served from this site itself. No requests are made to external servers and no cookies are set when loading them.",
        ] },
        { type: "p", text: "No Google Analytics, social-media pixels or advertising cookies are used." },
        { type: "h2", text: "3. Third-party links and services" },
        { type: "p", text: "When you tap the WhatsApp, email or Instagram button, you leave this site for those services, which have their own cookie and privacy policies." },
        { type: "h2", text: "4. How to manage or delete storage" },
        { type: "p", text: "You can delete local storage and cookies from your browser settings (Chrome, Safari, Edge or Firefox), in the privacy or browsing-data section. If you delete it, the site returns to its initial language and motion preferences." },
        { type: "h2", text: "5. Changes" },
        { type: "p", text: "If tools that do use non-essential cookies (for example analytics) are added in the future, this policy will be updated and your consent will be requested with options to accept or reject them." },
      ],
    },
  },
};
