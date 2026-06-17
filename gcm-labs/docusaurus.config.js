// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'GCM Workshop',
  tagline: 'Hands-on labs for IBM Guardium Cryptography Manager and Quantum Safe technologies',
  favicon: 'img/favicon.png',

  future: {
    v4: true,
  },

  url: 'https://IBM.github.io',
  baseUrl: process.env.NODE_ENV === 'development' ? '/' : '/gcm-bootcamp/',

  organizationName: 'IBM',
  projectName: 'gcm-bootcamp',

  onBrokenLinks: 'throw',

  plugins: ['docusaurus-plugin-image-zoom'],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/IBM/gcm-bootcamp/edit/main/gcm-labs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.svg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'GCM Workshop',
        logo: {
          alt: 'IBM Logo',
          src: 'img/ibm-logo.png',
          srcDark: 'img/ibm-logo-dark.png',
          height: 60,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Labs',
          },
          {
            type: 'docSidebar',
            sidebarId: 'resourcesSidebar',
            position: 'left',
            label: 'Resources',
          },
          {
            href: 'https://github.com/IBM/gcm-bootcamp',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Labs',
            items: [
              {
                label: 'Lab Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
            ],
          },
          {
            title: 'Resources',
            items: [
              {
                label: 'Event Resources',
                to: '/docs/resources',
              },
            ],
          },
          {
            title: 'IBM Resources',
            items: [
              {
                label: 'IBM Guardium',
                href: 'https://www.ibm.com/products/guardium',
              },
              {
                label: 'IBM Quantum Safe',
                href: 'https://www.ibm.com/quantum/quantum-safe',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/IBM/gcm-bootcamp',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} IBM Corporation. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      zoom: {
        selector: '.markdown img',
        config: {
          background: {
            light: 'rgba(0, 0, 0, 0.8)',
            dark: 'rgba(0, 0, 0, 0.8)',
          },
        },
      },
    }),
};

export default config;
