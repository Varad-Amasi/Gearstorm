import { useState } from 'react';
import { VENUE } from '@/utils/competition';

const mapSrc = `https://maps.google.com/maps?q=${VENUE.mapQuery}&z=15&output=embed`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${VENUE.mapQuery}`;

/**
 * Campus map that does not fetch Google Maps until the visitor asks.
 * The embed is heavy on mobile and was blocking Contact.
 */
export const CampusMap = (): JSX.Element => {
  const [loadEmbed, setLoadEmbed] = useState(false);

  if (!loadEmbed) {
    return (
      <div className="overflow-hidden rounded-lg border border-border bg-dark-800">
        <div className="flex min-h-48 flex-col items-start justify-center gap-3 p-5 md:min-h-64">
          <p className="font-heading font-semibold text-text-light">
            {VENUE.name}
          </p>
          <p className="text-sm text-text-muted">
            {VENUE.city}, {VENUE.state}
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-md border border-border bg-dark-900 px-4 py-2 text-sm font-semibold text-text-light hover:border-accent"
              onClick={() => {
                setLoadEmbed(true);
              }}
            >
              Load campus map
            </button>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md px-4 py-2 text-sm font-semibold text-accent underline-offset-4 hover:underline"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <iframe
        title={`Map of ${VENUE.name}`}
        src={mapSrc}
        className="h-64 w-full border-0 bg-dark-900 md:h-80"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
};
