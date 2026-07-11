import { useI18n } from '@/i18n/I18nContext';

type DemoThumbnailProps = {
  resultId: string;
  title: string;
};

export function DemoThumbnail({ resultId, title }: DemoThumbnailProps) {
  const { t } = useI18n();
  const playLabel = t('play_demo');

  return (
    <a
      className="mb-demo-button"
      href={`/demos/${resultId}/index.html`}
      target="_blank"
      rel="noreferrer"
      aria-label={`${title}: ${playLabel}`}
    >
      <img
        src={`/thumbnails/${resultId}.webp`}
        alt={`${title} preview`}
        loading="lazy"
        width="1200"
        height="675"
      />
      <span className="mb-demo-label">{playLabel} ↗</span>
    </a>
  );
}
