import a2bWebsite from '../assets/projects/a2b-website-supplied.webp';
import a2bFacebook from '../assets/projects/a2b-facebook-hd.webp';
import a2bInstagram from '../assets/projects/a2b-instagram-hd.webp';
import a2bCatering from '../assets/projects/a2b-catering-thumbnail.webp';
import biriyaniWebsite from '../assets/projects/biriyani-website-supplied.webp';
import biriyaniFacebook from '../assets/projects/biriyani-facebook-hd.webp';
import biriyaniLogo from '../assets/projects/biriyani.webp';
import thiraiFullFrame from '../assets/projects/thirai-full-frame.webp';
import thiraiFacebook from '../assets/projects/thirai-facebook-featured.webp';
import thiraiLogo from '../assets/projects/thirai.webp';

export const PROJECTS_DATA = [
  {
    id: 'a2b-perth',
    title: 'A2B Perth',
    categories: ['Web', 'Social', 'Video'],
    summary: 'Website, social media pages and promotional reels for a food and catering brand in Perth.',
    deliverables: [
      { label: 'Website', type: 'web' },
      { label: 'Facebook page', type: 'social' },
      { label: 'Instagram page', type: 'social' },
      { label: 'Reel', type: 'video' },
    ],
    links: [
      { label: 'Website', url: 'https://a2bperth.com.au/', type: 'web' },
      { label: 'Instagram', url: 'https://www.instagram.com/a2bperth/', type: 'social' },
      { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61550215796504', type: 'social' },
      { label: 'Reel', url: 'https://www.youtube.com/watch?v=yHSzoPraJVQ', type: 'video' },
    ],
    cover: a2bWebsite,
    gallery: [
      { src: a2bWebsite, alt: 'A2B Perth website design' },
      { src: a2bFacebook, alt: 'A2B Perth Facebook page design' },
      { src: a2bInstagram, alt: 'A2B Perth Instagram page design' },
      { src: a2bCatering, alt: 'A2B Perth catering promotional creative' },
    ],
  },
  {
    id: 'biriyani-box',
    title: 'Biriyani Box',
    categories: ['Web', 'Social'],
    summary: 'Website and Facebook presence showcasing a food brand.',
    deliverables: [
      { label: 'Website', type: 'web' },
      { label: 'Facebook page', type: 'social' },
    ],
    links: [
      { label: 'Website', url: 'https://biriyanibox.com.au/', type: 'web' },
      { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61594620573498', type: 'social' },
    ],
    cover: biriyaniWebsite,
    gallery: [
      { src: biriyaniWebsite, alt: 'Biriyani Box website design' },
      { src: biriyaniFacebook, alt: 'Biriyani Box Facebook page design' },
      { src: biriyaniLogo, alt: 'Biriyani Box logo' },
    ],
  },
  {
    id: 'thirai-flicks',
    title: 'Thirai Flicks',
    categories: ['Social', 'Video'],
    summary: 'Video content and Facebook page for an entertainment brand.',
    deliverables: [
      { label: 'Video', type: 'video' },
      { label: 'Facebook page', type: 'social' },
    ],
    links: [
      { label: 'Video', url: 'https://www.youtube.com/watch?v=WGW4HYoVm_I', type: 'video' },
      { label: 'Facebook', url: 'https://www.facebook.com/thiraiflicks1', type: 'social' },
    ],
    cover: thiraiFullFrame,
    gallery: [
      { src: thiraiFullFrame, alt: 'Thirai Flicks video content' },
      { src: thiraiFacebook, alt: 'Thirai Flicks Facebook page design' },
      { src: thiraiLogo, alt: 'Thirai Flicks logo' },
    ],
  },
];

export default PROJECTS_DATA;
