module.exports = {
  email: 'martin.sagat@outlook.com.au',

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/martinsagat',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/martin_sagat',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/martinsagat',
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/martinsagat',
    },
    {
      name: 'Codepen',
      url: 'https://codepen.io/martinsagat',
    },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Projects',
      url: '/#projects',
    },
    {
      name: 'Articles',
      url: '/articles',
    },
    {
      name: 'Interests',
      url: '/#interests',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    navy: '#0a182e',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 50, viewFactor = 0.15) => ({
    origin: 'bottom',
    distance: '10px',
    duration: 400,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
