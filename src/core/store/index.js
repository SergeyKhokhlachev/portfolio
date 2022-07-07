import { readable } from 'svelte/store';

import { WebGLRenderer } from 'three';

export const webGLRenderer = readable(new WebGLRenderer());

export const navRout = readable(['/', '/skills', '/projects', '/experience', '/contacts']);



export const skills = readable({
  common: [
    {
      name: 'JS',
      desc: 'ES6 +, Vue, Svelte'
    }, {
      name: 'HTML5',
      desc: 'including Canvas API'
    }, {
      name: 'CSS3',
      desc: 'SASS, LESS, PostCSS'
    }, {
      name: 'WebGl',
      desc: 'Three.js, Babylon.js'
    }, {
      name: 'SVG animations',
      desc: 'SMIL'
    }, {
      name: 'Webpack, Gulp',
      desc: null
    }, {
      name: 'Git',
      desc: 'basic commands, teamwork'
    }
  ],
  detail: [
    {
      icon: 'icons/vue.svg',
      title: 'Vue',
      text: 'SPA development based on MVC architecture. Using Vuex to create a centralized store for all the components in an application. Using the REST API to interact with the backend.',
    }, {
      icon: 'icons/svelte.svg',
      title: 'Svelte',
      text: 'SPA development based on MVC architecture. Creation of CSS, JS, SVG animations using framework methods',
    }, {
      icon: 'icons/sass.svg',
      title: 'SASS',
      text: 'Using variables, mixins, functions, nesting to speed up the development process and simplify code reuse',
    }, {
      icon: 'icons/git.svg',
      title: 'GIT',
      text: 'Implementing version control based on the Feature Branch Workflow model',
    }, {
      icon: 'icons/html.svg',
      title: 'HTML',
      text: 'Valid (W3C), semantic layout, ensuring accessibility in accordance with WCAG (v2.0) recommendations. Source code: HTML or Pug preprocessors',
    }, {
      icon: 'icons/css.svg',
      title: 'CSS',
      text: 'Adaptive (mobile first), responsive, cross-browser markup styling. Applying the BEM methodology for naming selectors and component approach. Source code: CSS or SASS, LESS preprocessors',
    }, {
      icon: 'icons/js.svg',
      title: 'JS',
      text: 'Vanilla JavaScript (ES6 +) programming, using the jQuery library. SPA development on the Vue, Svelte frameworks',
    }, {
      icon: 'icons/svg.svg',
      title: 'SVG',
      text: 'Animating SVG graphics using animation elements, defined by the SMIL specification',
    }, {
      icon: 'icons/webgl.svg',
      title: 'WebGL',
      text: 'Working with Three.js and Babylon.js frameworks',
    }, {
      icon: 'icons/webpack.svg',
      title: 'Webpack',
      text: 'Project build automation configuration',
    }, {
      icon: 'icons/gulp.svg',
      title: 'Gulp',
      text: 'Project build automation configuration',
    }
  ]
});

export const projects = readable([
  {
    name: 'Boxing Federation',
    link: null,
    image: 'img/box_federation.jpg'
  }, {
    name: 'Portal GISP',
    link: 'https://gisp.gov.ru/',
    image: 'img/gisp.jpg'
  }, {
    name: 'AS «Consolidator»',
    link: null,
    image: 'img/ac_consolidator.jpg'
  }, {
    name: 'Gazpromneft Oil',
    link: 'https://gazpromneft-oil.ru/',
    image: 'img/gazprom_oil.jpg'
  }, {
    name: 'G-Energy Oil',
    link: 'https://new.g-energy.org/',
    image: 'img/g_energy.jpg'
  }, {
    name: 'G-Energy Service',
    link: 'https://service.g-energy.org/',
    image: 'img/g_energy_service.jpg'
  }, {
    name: 'E-Forum',
    link: 'https://e-forum.net/',
    image: 'img/e_forum.jpg'
  }, {
    name: 'Rosstrud',
    link: 'https://www.rostrud.ru/',
    image: 'img/rosstrud.jpg'
  }, {
    name: 'Muzzmania',
    link: null,
    image: 'img/muzzmania.jpg'
  }, {
    name: 'RC «Rose del Mare»',
    link: null,
    image: 'img/rose_del_mare.jpg'
  }, {
    name: 'RC «Marshal»',
    link: 'http://xn----8sbavuje7a2e.xn--p1ai/',
    image: 'img/marshal.jpg'
  }, {
    name: 'Moscow City Hall',
    link: 'https://www.mos.ru/',
    image: 'img/mos_ru.jpg'
  }, {
    name: 'Nizhny Novgorod City Hall',
    link: 'https://xn--b1acdfjbh2acclca1a.xn--p1ai/',
    image: 'img/nn_off_site.jpg'
  }, {
    name: 'Rehabilitation Industry',
    link: 'https://rirportal.ru/',
    image: 'img/rehabilitation_industry.jpg'
  }, {
    name: 'Classkid',
    link: 'https://classkid.ru/',
    image: 'img/classkid.jpg'
  },
]);

export const experience = readable([
  {
    date: '2017 - 2018',
    company: 'Freelance',
    position: 'Front-end developer',
    responsibility: [
      'Cross-browser layout',
      'Responsive layout',
      'Adaptive layout (mobile first)',
      'JavaScript programming (ES5, jQuery)',
      'Layout integration with CMS (Wordpress, Joomla)',
      'Make animations - CSS, JS',
    ]
  }, {
    date: '2018 - 2020',
    company: '"Nsign"',
    position: 'Front-end developer',
    responsibility: [
      'HTML code (BEM, Mobile First)',
      'JavaScript programming (ES5, jQuery)',
      'Front-end integration (YII2, REST API)',
      'Make animations - CSS, JS',
      'Integrating 3D MAX Models into Canvas (WebGL, Babylon.js)',
      'Teamwork - Git (GitLab, Bitbucket)',
    ]
  }, {
    date: '2020 - 2022',
    company: '"Liberty"',
    position: 'Front-end developer',
    responsibility: [
      'HTML code (BEM, Mobile First)',
      'JavaScript programming (ES6)',
      'Front-end integration (Vue, Vuex, Axios, REST API)',
      'Make animations - CSS, JS, SVG (SMIL)',
      'Make animations - Canvas (2D Context API)',
      'Teamwork - Git (GitLab)',
    ]
  }
]);

export const contact = readable({
  name: 'Sergey Khokhlachev',
  position: 'Front-end developer',
  list: [
    {
      key: 'email',
      val: 'sergey.khokhlachev@inbox.ru'
    }, {
      key: 'telegram',
      val: '@sergey_khokhlachev'
    }
  ]
});
