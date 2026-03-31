import { COLORS } from '../constants/colors'
import { IMAGES } from '../constants/IMAGES';

export const mockData = {
  hero: {
    name: "HARIS PATEL",
    roles: ["SOFTWARE ENGINEER", "FULLSTACK DEVELOPER", "MOBILE APP DEVELOPER"],
    logoLink: "https://hspdev.blogspot.com/",
    aboutAnchorText: "About Me"
  },
  about: {
    paragraphs: [
      "I'm Haris Patel, a dedicated Full-stack Developer with more than 8 years of experience building and optimizing high-performance digital products. My work lives at the intersection of technical precision and creative vision, shaped by my background in graphic design and cinematic video production.",
      "Throughout my journey, I've seen web and mobile technologies evolve and have enjoyed mastering both the front-end and back-end to build complete, meaningful experiences. I love creating responsive, scalable architectures that don't just work well, but feel intuitive and elegant to the people using them.",
      "Beyond the code, I'm passionate about visual storytelling. I use video design and motion graphics to turn complex ideas into engaging narratives—from dynamic brand promotions to detailed whiteboard animations that truly connect with an audience.",
      "I'm driven by a constant curiosity for what's next. Whether I'm architecting a complex system or directing a visual project, my goal is always the same: to deliver high-quality, efficient results that make a real difference."
    ],
    resumeLink: "https://drive.google.com/file/d/1lsfemSQaogkUJeDhV0sZ7edcoOGN5szH/view?usp=sharing"
  },
  experience: [
    {
      company: 'Phenom',
      duration: '(3 Months)',
      role: 'Worked as Intern in Website Designing',
    },
    {
      company: 'Belgaum Online',
      duration: '(1yr, 1 month)',
      role: 'Website Designer & Developer',
    },
    {
      company: 'Mantiqh Technologies',
      duration: '(1 yr 4 months)',
      role: 'Junior Mobile Application Developer',
    },
    {
      company: 'Al Rabeeh Group',
      duration: '(1 yr 5 months)',
      role: 'Software Developer',
    },
    {
      company: 'Provab Technosoft',
      duration: '(Aug 2024 - Dec 2025)',
      role: 'Mobile Application Developer',
    },
    {
      company: 'Enhancesys Innivation Pvt. Ltd.',
      duration: '(Jan 2025 - Present)',
      role: 'Software Engineer',
    },
  ],
  skills: [
    { name: 'REACT NATIVE', logoUrl: IMAGES.ReactLogo },
    { name: 'REACT JS', logoUrl: IMAGES.ReactNative},
    { name: 'HTML 5', logoUrl: IMAGES.HtmlLogo },
    { name: 'CSS 3', logoUrl: IMAGES.CssLogo },
    { name: 'JAVASCRIPT', logoUrl: IMAGES.JsLogo },
    { name: 'BOOTSTRAP', logoUrl: IMAGES.BootstrapLogo },
    { name: 'PHP', logoUrl: IMAGES.php },
    { name: 'TAILWIND CSS', logoUrl: IMAGES.Tailwind },
    { name: 'NODE JS', logoUrl: IMAGES.nodejs },
    { name: 'MY SQL', logoUrl: IMAGES.Mysql },
  ],
  projects: [
    {
      name: 'DENTAL CHART',
      year: '2023',
      stack: 'React Js, Node (Adonis), MySql, Ant Design',
      imageKey: 'dental'
    },
    {
      name: 'THE PARTIMERS',
      year: '2022',
      stack: 'React Js, Node (Express), MySql, Material UI',
      imageKey: 'partimer'
    },
    {
      name: 'MY PHONE BOOK',
      year: '2021',
      stack: 'React Js, PHP (Laravel), MySql, Material UI',
      imageKey: 'phonebook'
    },
  ],
  stats: {
    dailyDevUrl: "https://app.daily.dev/harispatel62",
    dailyDevCardApi: "https://api.daily.dev/devcards/v2/WVzbZP0WZQu5i72nrMzZd.png?type=default&r=ijb",
    dailyDevUsername: "@harispatel62",
    testimonials: [
      {
        name: 'jshank29',
        flag: '🇺🇸 United States',
        stars: 5,
        text: 'Very easy to work with, made the changes I asked for. Would work with them again.',
      },
      {
        name: 'sibanatechopc',
        flag: '🇮🇳 India',
        stars: 5,
        text: 'Great job and Nice work .Harispatel is very patient and seller is very professional with great intuition.Definately would like to work with on future projects.',
      },
      {
        name: 'jahadappleton',
        flag: '🇯🇲 Jamaica',
        stars: 5,
        text: 'Extremely one of the best on Fiverr. Lovely working with his team, I definitely will be using his service in near future.',
      },
      {
        name: 'randomthingsfro',
        flag: '🇬🇧 United Kingdom',
        stars: 5,
        text: 'I love the work they do',
      },
      {
        name: 'alpeshbhalani',
        flag: '🇮🇳 India',
        stars: 5,
        text: 'Very Nice person. Ready to incorporate suggestions, prompt communication, good understanding of customers need. Thank you.',
      },
      {
        name: 'venkat_selvaraj',
        flag: '🇬🇧 United Kingdom',
        stars: 5,
        text: 'Very satisfied with the final outcome. Great commitment to deliver quality service. Cheers team. Will get back again.',
      },
    ],
    fiverr: {
      username: "harispatel62",
      url: "https://www.fiverr.com/harispatel62",
      rating: 5.0,
      bannerText: "HSP designer & developers"
    }
  },
  contact: {
    email: "harispatel62@gmail.com",
    socialLinks: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/haris-patel-dev/', iconName: 'LinkedinOutlined', darkColor: COLORS.BRAND.LINKEDIN, lightColor: COLORS.BRAND.LINKEDIN },
      { name: 'GitHub', url: 'https://github.com/Harispateldev', iconName: 'GithubOutlined', darkColor: COLORS.WHITE, lightColor: COLORS.DARK_GREY },
      { name: 'GitLab', url: 'https://gitlab.com/harispatel', iconName: 'GitlabOutlined', darkColor: COLORS.BRAND.GITLAB, lightColor: COLORS.BRAND.GITLAB },
      { name: 'Fiverr', url: 'https://www.fiverr.com/harispatel62', iconName: 'Fiverr', darkColor: COLORS.BRAND.FIVERR, lightColor: COLORS.BRAND.FIVERR },
      { name: 'Mail', url: 'mailto:harispatel62@gmail.com', iconName: 'MailOutlined', darkColor: COLORS.BRAND.GOOGLE_RED, lightColor: COLORS.BRAND.GOOGLE_RED },
      { name: 'WhatsApp', url: 'https://wa.me/+917795434226', iconName: 'WhatsAppOutlined', darkColor: COLORS.BRAND.WHATSAPP, lightColor: COLORS.BRAND.WHATSAPP },
    ],
    copyright: "© 2026"
  }
};
