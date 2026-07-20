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
          "Domicilio a efectos de notificaciones: Viladrau (Girona), 17406, Catalunya.",
          "Correo electrónico: picoiudavid@gmail.com",
          "Teléfono: 643 78 07 53",
          "Actividad: diseño y desarrollo de páginas web.",
        ] },
        { type: "h2", text: "2. Objeto" },
        { type: "p", text: "Este sitio web tiene como finalidad presentar los servicios de diseño y desarrollo web de Picodavi y facilitar el contacto con personas interesadas. El acceso y uso del sitio atribuye la condición de usuario e implica la aceptación de este aviso legal." },
        { type: "h2", text: "3. Condiciones de uso" },
        { type: "p", text: "El usuario se compromete a hacer un uso adecuado de los contenidos del sitio y a no emplearlos para actividades ilícitas, contrarias a la buena fe o que puedan dañar el sitio o a terceros. La información de precios y servicios es orientativa. Los precios publicados son importes base y no incluyen IVA; cuando se active la contratación, cualquier encargo se formalizará mediante un presupuesto que desglose base imponible, impuestos y total, y requerirá aceptación expresa." },
        { type: "h2", text: "4. Propiedad intelectual e industrial" },
        { type: "p", text: "Los textos, el diseño, el código y los elementos gráficos propios de este sitio pertenecen al titular o cuentan con licencia para su uso. Las fotografías de stock proceden de Unsplash bajo su licencia de uso libre. No se permite la reproducción total o parcial de los contenidos propios sin autorización." },
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
          "Address for notifications: Viladrau (Girona), 17406, Catalonia.",
          "Email: picoiudavid@gmail.com",
          "Phone: 643 78 07 53",
          "Activity: web design and development.",
        ] },
        { type: "h2", text: "2. Purpose" },
        { type: "p", text: "This website aims to present Picodavi's web design and development services and to make it easier for interested people to get in touch. Accessing and using the site grants you the status of user and implies acceptance of this legal notice." },
        { type: "h2", text: "3. Terms of use" },
        { type: "p", text: "The user agrees to make appropriate use of the site's content and not to use it for unlawful activities, activities contrary to good faith, or activities that may harm the site or third parties. Price and service information is indicative. Published prices are base amounts and exclude VAT; once commissioning opens, each project will be formalised through a written quote showing the taxable base, taxes and total, with express acceptance." },
        { type: "h2", text: "4. Intellectual and industrial property" },
        { type: "p", text: "The texts, design, code and original graphic elements of this site belong to the owner or are licensed for use. Stock photographs come from Unsplash under its free-use licence. Total or partial reproduction of the original content is not permitted without authorisation." },
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
          "Ubicación: Viladrau (Girona), 17406, Catalunya.",
          "Email: picoiudavid@gmail.com",
          "Teléfono: 643 78 07 53",
        ] },
        { type: "h2", text: "2. Qué datos trato y de dónde salen" },
        { type: "p", text: "Solo trato los datos que tú me facilitas voluntariamente cuando contactas conmigo: a través del formulario de la web (tu nombre, tu email o teléfono, el tipo de negocio y el mensaje que escribas; el formulario no almacena nada en un servidor: prepara un mensaje y lo abre en WhatsApp para que lo envíes tú), o si me escribes por WhatsApp, correo electrónico o Instagram (los datos que incluyas en esa conversación)." },
        { type: "p", text: "No utilizo cookies de seguimiento ni de publicidad, ni elaboro perfiles. Consulta la Política de cookies para el detalle del almacenamiento técnico." },
        { type: "h2", text: "3. Para qué uso tus datos" },
        { type: "p", text: "Para responder a tu consulta y, si procede, preparar un presupuesto, y para mantener el contacto necesario para llevar a cabo el proyecto que me encargues. No uso tus datos para enviarte publicidad ni los cedo a terceros para fines comerciales." },
        { type: "h2", text: "4. Legitimación" },
        { type: "p", text: "La base legal es tu consentimiento, que prestas al enviarme el mensaje, y, en su caso, la ejecución de un contrato o presupuesto que me solicites." },
        { type: "h2", text: "5. Conservación" },
        { type: "p", text: "Conservo tus datos el tiempo necesario para atender tu solicitud y, si se convierte en un encargo, durante la relación profesional y los plazos legales aplicables. Después se eliminan o se anonimizan." },
        { type: "h2", text: "6. Destinatarios y encargados" },
        { type: "p", text: "Para funcionar, la web y el contacto se apoyan en servicios de terceros que actúan como proveedores: WhatsApp / Meta (cuando envías el formulario o me escribes por WhatsApp), Google / Gmail (solo si me escribes por correo) y Hostinger (alojamiento de la web, con servidores en la UE según el plan contratado). Las tipografías están autoalojadas, así que no se envía ningún dato a terceros para cargarlas. Cada proveedor tiene su propia política de privacidad y sus propias garantías." },
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
          "Location: Viladrau (Girona), 17406, Catalonia.",
          "Email: picoiudavid@gmail.com",
          "Phone: 643 78 07 53",
        ] },
        { type: "h2", text: "2. What data I process and where it comes from" },
        { type: "p", text: "I only process the data you voluntarily provide when you contact me: through the website form (your name, your email or phone, the type of business and the message you write; the form does not store anything on a server: it prepares a message and opens it in WhatsApp for you to send), or if you write to me on WhatsApp, email or Instagram (the data you include in that conversation)." },
        { type: "p", text: "I do not use tracking or advertising cookies, and I do not build profiles. See the Cookie policy for details of the technical storage." },
        { type: "h2", text: "3. What I use your data for" },
        { type: "p", text: "To reply to your enquiry and, where appropriate, prepare a quote, and to keep the contact needed to carry out the project you commission. I do not use your data to send you advertising, nor do I share it with third parties for commercial purposes." },
        { type: "h2", text: "4. Legal basis" },
        { type: "p", text: "The legal basis is your consent, given when you send me the message, and, where applicable, the performance of a contract or quote you request." },
        { type: "h2", text: "5. Retention" },
        { type: "p", text: "I keep your data for as long as needed to handle your request and, if it becomes a project, for the duration of the professional relationship and the applicable legal periods. Afterwards it is deleted or anonymised." },
        { type: "h2", text: "6. Recipients and processors" },
        { type: "p", text: "To work, the website and contact rely on third-party services acting as providers: WhatsApp / Meta (when you send the form or message me on WhatsApp), Google / Gmail (only if you email me) and Hostinger (website hosting, with servers in the EU depending on the plan). The fonts are self-hosted, so no data is sent to third parties to load them. Each provider has its own privacy policy and safeguards." },
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
      updated: "Última actualización: junio de 2026",
      blocks: [
        { type: "box", text: "Buenas noticias: esta web es muy «ligera» en cuanto a cookies. No usa cookies de publicidad ni de seguimiento, ni herramientas de analítica. Solo guarda un par de datos técnicos en tu navegador para que la web funcione bien." },
        { type: "h2", text: "1. ¿Qué son las cookies?" },
        { type: "p", text: "Son pequeños archivos o datos que una web guarda en tu navegador. Pueden servir para que el sitio recuerde tus preferencias, para medir visitas o para mostrar publicidad. La normativa solo exige tu consentimiento para las que no son estrictamente necesarias." },
        { type: "h2", text: "2. Qué usa exactamente esta web" },
        { type: "p", text: "Esta web utiliza únicamente almacenamiento local técnico (no son cookies de seguimiento) y una fuente tipográfica externa:" },
        { type: "ul", items: [
          "picodavi-lang — guarda tu idioma (español o inglés) para recordarlo en tu próxima visita. Técnica / necesaria.",
          "picodavi-cookies — recuerda que ya has visto el aviso de cookies, para no mostrártelo cada vez. Técnica / necesaria.",
          "Tipografías propias — las fuentes se sirven desde este mismo sitio (autoalojadas). No se hacen peticiones a servidores externos ni se instalan cookies al cargarlas.",
        ] },
        { type: "p", text: "No se utiliza Google Analytics, ni píxeles de redes sociales, ni cookies de publicidad." },
        { type: "h2", text: "3. Enlaces y servicios de terceros" },
        { type: "p", text: "Cuando pulsas el botón de WhatsApp, el correo o Instagram, sales de esta web hacia esos servicios, que tienen sus propias políticas de cookies y privacidad." },
        { type: "h2", text: "4. Cómo gestionar o borrar el almacenamiento" },
        { type: "p", text: "Puedes borrar el almacenamiento local y las cookies desde la configuración de tu navegador (Chrome, Safari, Edge o Firefox), en el apartado de privacidad o datos de navegación. Si lo borras, la web simplemente volverá a preguntarte el idioma y a mostrar el aviso de cookies." },
        { type: "h2", text: "5. Cambios" },
        { type: "p", text: "Si en el futuro se añaden herramientas que sí usen cookies no esenciales (por ejemplo analítica), se actualizará esta política y se pedirá tu consentimiento con opciones para aceptarlas o rechazarlas." },
      ],
    },
    en: {
      kicker: "Legal",
      title: "Cookie policy",
      updated: "Last updated: June 2026",
      blocks: [
        { type: "box", text: "Good news: this website is very “light” on cookies. It uses no advertising or tracking cookies and no analytics tools. It only stores a couple of technical items in your browser so the site works properly." },
        { type: "h2", text: "1. What are cookies?" },
        { type: "p", text: "They are small files or data that a website stores in your browser. They can be used to remember your preferences, measure visits or show advertising. The regulations only require your consent for those that are not strictly necessary." },
        { type: "h2", text: "2. What exactly this website uses" },
        { type: "p", text: "This website uses only technical local storage (not tracking cookies) and one external font:" },
        { type: "ul", items: [
          "picodavi-lang — stores your language (Spanish or English) to remember it on your next visit. Technical / necessary.",
          "picodavi-cookies — remembers that you have already seen the cookie notice, so it is not shown every time. Technical / necessary.",
          "Self-hosted fonts — the fonts are served from this site itself. No requests are made to external servers and no cookies are set when loading them.",
        ] },
        { type: "p", text: "No Google Analytics, social-media pixels or advertising cookies are used." },
        { type: "h2", text: "3. Third-party links and services" },
        { type: "p", text: "When you tap the WhatsApp, email or Instagram button, you leave this site for those services, which have their own cookie and privacy policies." },
        { type: "h2", text: "4. How to manage or delete storage" },
        { type: "p", text: "You can delete local storage and cookies from your browser settings (Chrome, Safari, Edge or Firefox), in the privacy or browsing-data section. If you delete it, the site will simply ask for your language again and show the cookie notice." },
        { type: "h2", text: "5. Changes" },
        { type: "p", text: "If tools that do use non-essential cookies (for example analytics) are added in the future, this policy will be updated and your consent will be requested with options to accept or reject them." },
      ],
    },
  },
};
