import { COMPONENTS } from '../data/components';
import { docHeading, tabLabel } from '../i18n/docs';
import { useStrings } from '../i18n/strings';
import { useLocale } from '../locale';

/* Locale-aware doc-page headings. Each renders exactly the markup the doc pages used to
   write by hand (`<h1 className="ds-doc__title">`, `<h2 className="ds-section__title">`,
   `<h3 className="ds-section__subtitle">`), so ButtonDoc.css's shared heading styles and
   the AnchorNav's section ids keep working unchanged — only the text follows the EN/中
   toggle. Children are the English text, which doubles as the translation key. */

/** The "Component" eyebrow above the page h1 — site chrome, so it reads from i18n/strings. */
export function DocEyebrow() {
  const strings = useStrings().doc;
  return <span className="ds-doc__eyebrow">{strings.eyebrow}</span>;
}

/** The header's "View in Figma" button — the secondary/solid/md Button markup every page
 * wrote by hand, with only the label following the EN/中 toggle. */
export function FigmaLink({ href }: { href: string }) {
  const strings = useStrings().doc;
  return (
    <a
      className="ds-doc__figma-link ds-button ds-button--secondary ds-button--solid ds-button--md"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span className="icon ds-button__icon" aria-hidden="true">
        draw
      </span>
      <span className="ds-button__label">{strings.viewInFigma}</span>
    </a>
  );
}

/** Page h1 — the component's name, translated via its `nameZh` in data/components.ts. */
export function DocTitle({ children }: { children: string }) {
  const locale = useLocale();
  const entry = COMPONENTS.find((c) => c.name === children);
  return <h1 className="ds-doc__title">{locale === 'zh' && entry ? entry.nameZh : children}</h1>;
}

/** Section h2 (Overview, Anatomy, Variants, States, Layout & Spacing, Related Components). */
export function SectionTitle({ children }: { children: string }) {
  const locale = useLocale();
  return <h2 className="ds-section__title">{docHeading(children, locale)}</h2>;
}

/** Sub-section h3 (Example, Style, ...). */
export function SectionSubtitle({ children }: { children: string }) {
  const locale = useLocale();
  return <h3 className="ds-section__subtitle">{docHeading(children, locale)}</h3>;
}

/** Variant-group caption (Style, Size, Example, ...) — the span above a variant group or,
 * with `tabs`, above a .ds-line-tabs strip (adds the ds-variant-tabs-label spacing modifier,
 * exactly as the pages wrote it by hand). */
export function VariantLabel({ children, tabs }: { children: string; tabs?: boolean }) {
  const locale = useLocale();
  return (
    <span className={tabs ? 'ds-variant-group__label ds-variant-tabs-label' : 'ds-variant-group__label'}>
      {docHeading(children, locale)}
    </span>
  );
}

/** Text of one .ds-line-tab button. Wraps whatever the page already rendered there (a tab
 * state value, `tab.label`, or literal text) and translates it by display text, so the
 * pages' tab state and `aria-selected` logic stay untouched. Renders text only, no element. */
export function TabLabel({ children }: { children: string }) {
  const locale = useLocale();
  return <>{tabLabel(children, locale)}</>;
}
