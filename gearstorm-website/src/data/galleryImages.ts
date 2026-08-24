export type GalleryCategory = 'Builds' | 'Course' | 'Teams' | 'Awards';

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  year: number;
  caption: string;
}

/**
 * Local SVG placeholders until event photography is supplied.
 * Paths point at files in `public/gallery/`.
 */
export const GALLERY_ITEMS: readonly GalleryItem[] = [
  {
    id: 'g1',
    src: '/gallery/build-01.svg',
    alt: 'Compact four-wheel competition bot on a workbench',
    category: 'Builds',
    year: 2025,
    caption: 'Prototype chassis ahead of technical inspection',
  },
  {
    id: 'g2',
    src: '/gallery/course-01.svg',
    alt: 'Obstacle course lane with gates and a ramp',
    category: 'Course',
    year: 2025,
    caption: 'Qualifier lane layout',
  },
  {
    id: 'g3',
    src: '/gallery/team-01.svg',
    alt: 'Student team gathered around their robot',
    category: 'Teams',
    year: 2025,
    caption: 'Pit-area strategy huddle',
  },
  {
    id: 'g4',
    src: '/gallery/build-02.svg',
    alt: 'Close-up of a gripper and sensor mast',
    category: 'Builds',
    year: 2024,
    caption: 'Sensor mast and servo gripper detail',
  },
  {
    id: 'g5',
    src: '/gallery/awards-01.svg',
    alt: 'Trophy and medals on a presentation table',
    category: 'Awards',
    year: 2024,
    caption: 'Prize presentation',
  },
  {
    id: 'g6',
    src: '/gallery/course-02.svg',
    alt: 'Finals course with precision stop zone',
    category: 'Course',
    year: 2024,
    caption: 'Finals precision zone',
  },
  {
    id: 'g7',
    src: '/gallery/team-02.svg',
    alt: 'Operators at the control desk during a run',
    category: 'Teams',
    year: 2025,
    caption: 'Drivers locked in during a timed run',
  },
  {
    id: 'g8',
    src: '/gallery/build-03.svg',
    alt: 'Electronics deck with microcontroller and wiring',
    category: 'Builds',
    year: 2024,
    caption: 'Clean wiring pass before race day',
  },
] as const;

export const GALLERY_CATEGORIES = [
  'All',
  'Builds',
  'Course',
  'Teams',
  'Awards',
] as const;

export const GALLERY_YEARS = ['All', '2025', '2024'] as const;
