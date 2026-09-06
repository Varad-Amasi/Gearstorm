export type GalleryCategory = 'Builds' | 'Course' | 'Teams' | 'Awards';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  year: number;
  caption: string;
}

const gs10 = (
  file: string,
  id: string,
  category: GalleryCategory,
  caption: string,
  alt: string
): GalleryItem => ({
  id,
  src: `/gallery/2025/${file}`,
  alt,
  category,
  year: 2025,
  caption,
});

/** Hero image for the GearStorm 1.0 recap. */
export const GALLERY_RECAP: GalleryItem = gs10(
  '20250529_173326.jpg',
  'gs10-recap',
  'Awards',
  'GearStorm 1.0 — the full house',
  'Teams and organisers on stage at the close of GearStorm 1.0'
);

/**
 * Moving strip under the recap. Duplicates, GPS-stamped shots, and
 * near-identical stage frames were dropped. Track photos are new.
 */
export const GALLERY_ITEMS: readonly GalleryItem[] = [
  gs10(
    'track-01.jpg',
    'gs10-track-01',
    'Course',
    'GearStorm 1.0 — night course',
    'LED-lined obstacle course from GearStorm 1.0'
  ),
  gs10(
    'track-02.jpg',
    'gs10-track-02',
    'Course',
    'GearStorm 1.0 — arena lights',
    'Yellow-tape course and obstacles at GearStorm 1.0'
  ),
  gs10(
    '20250529_115337.jpg',
    'gs10-build',
    'Builds',
    'GearStorm 1.0 — chassis',
    'Robot chassis and wiring at GearStorm 1.0'
  ),
  gs10(
    '20250529_115342.jpg',
    'gs10-course-side',
    'Course',
    'GearStorm 1.0 — course side',
    'Arena and course area at GearStorm 1.0'
  ),
  gs10(
    '20250529_121925.jpg',
    'gs10-run',
    'Course',
    'GearStorm 1.0 — timed run',
    'A timed run on the GearStorm 1.0 course'
  ),
  gs10(
    '20250529_171057.jpg',
    'gs10-bot',
    'Builds',
    'GearStorm 1.0 — after a run',
    'A competition robot after a GearStorm 1.0 run'
  ),
  gs10(
    '20250529_172745.jpg',
    'gs10-awards',
    'Awards',
    'GearStorm 1.0 — trophies',
    'Winning team with trophies at GearStorm 1.0'
  ),
  gs10(
    '20250529_172920.jpg',
    'gs10-stage',
    'Awards',
    'GearStorm 1.0 — presentations',
    'Prize presentation at GearStorm 1.0'
  ),
] as const;
