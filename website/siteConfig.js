/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* List of projects/orgs using your project for the users page */
const users = [
  {
    caption: 'User1',
    image: '/test-site/img/docusaurus.svg',
    infoLink: 'https://www.facebook.com',
    pinned: true,
  },
];

const siteConfig = {
  title: 'Ducky ISA' /* title for your website */,
  tagline: 'Ducky is a toy instruction set architecture based on RISC principles',
  url: 'https://DuckyISA.github.io' /* your website url */,
  baseUrl: '/' /* base url for your project */,
  headerLinks: [
    {
      doc: 'intro',
      label: 'Documentation'
    },
    {
      doc: 'toolchain',
      label: 'Tools'
    },
    {
      doc: 'implementations',
      label: 'Implementations'
    },
    {
      doc: 'contribute',
      label: 'Contribute'
    }
  ],
  //users,
  /* path to images for header/footer */
  headerIcon: 'img/ducky.png',
  footerIcon: 'img/ducky.png',
  favicon: 'img/favicon.png',
  /* colors for website */
  colors: {
    primaryColor: "#1A2B34",
    secondaryColor: "#808080"
  },
  /* custom fonts for website */
  /*fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },*/
  // This copyright info is used in /core/Footer.js and blog rss/atom feeds.
  copyright: 'Copyright © ' + new Date().getFullYear() + ' Milos Prchlik <happz@happz.cz>',
  organizationName: 'DuckyISA', // or set an env variable ORGANIZATION_NAME
  projectName: 'DuckyISA.github.io',
  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks
    theme: 'solarized-dark',
  },
  scripts: ['https://buttons.github.io/buttons.js'],
  // You may provide arbitrary config keys to be used as needed by your template.
  repoUrl: 'https://github.com/DuckyISA/DuckyISA.github.io',
  /* On page navigation for the current documentation page */
  onPageNav: 'separate',
};

module.exports = siteConfig;
