/** Hero background video in /public/media */
export const HERO_VIDEO_SRC = '/media/IMG_1765.MOV';

/** Site logo in /public/media */
export const LOGO_SRC = '/media/prestige-paving-logo-transparent.png';

/** Survey location step backgrounds in /public/media (slideshow) */
export const SURVEY_LOCATION_BG_SRCS = [
  '/media/pexels-snapwire-6998.jpg',
  '/media/Toronto-Sign.jpg',
  '/media/167_3_0900_jpeg_6507e740-9c05-46e9-933a-5d52f39f15a8.jpg',
];

/** Survey promo step video in /public/media */
export const SURVEY_PROMO_VIDEO_SRC = '/media/IMG_1760.mov';

/** Survey property step backgrounds in /public/media (slideshow) */
export const SURVEY_PROPERTY_BG_SRCS = [
  '/media/SuburbsPic2.jpg',
  '/media/kbbxdwhyai56fcycy5yb.avif',
  '/media/brampton.jpg',
];

/** Process section video in /public/media */
export const OUR_PROCESS_VIDEO_SRC = '/media/hf_20260525_223504_3fd90248-0d38-47f2-af62-9af44d87bc53.mp4';

/** Before/after driveway photo pairs in /public/media */
export const BEFORE_AFTER_PAIRS = [
  {
    before: '/media/IMG_1327.png',
    after: '/media/IMG_1331.png',
    altBefore: 'Driveway before sealing and paving',
    altAfter: 'Driveway after sealing and paving',
  },
  {
    before: '/media/IMG_1226.png',
    after: '/media/IMG_1235.png',
    altBefore: 'Driveway before restoration',
    altAfter: 'Driveway after restoration',
  },
  {
    before: '/media/IMG_4625.png',
    after: '/media/IMG_4626.png',
    altBefore: 'Driveway before sealing',
    altAfter: 'Driveway after sealing',
  },
  {
    before: '/media/IMG_4627.png',
    after: '/media/IMG_4629.png',
    altBefore: 'Driveway before paving',
    altAfter: 'Driveway after paving',
  },
];

/** Update with your live contact details */
export const PHONE_DISPLAY = '(905) 261-6800';
export const PHONE_TEL = '19052616800';
export const EMAIL = 'prestigeps10@gmail.com';

/**
 * URL for files in /public (e.g. public/media/...).
 * Uses Vite's BASE_URL so assets work when the app is not served from domain root.
 */
export function mediaUrl(path) {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}
