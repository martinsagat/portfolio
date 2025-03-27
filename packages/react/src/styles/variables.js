import { css } from 'styled-components';

const variables = css`
  :root {
    --dark-navy: #0a192f;
    --navy: #112240;
    --light-navy: #1d3461;
    --lightest-navy: #233554;
    --navy-shadow: rgba(2, 12, 27, 0.7);
    --dark-slate: #495670;
    --slate: #8892b0;
    --light-slate: #a8b2d1;
    --lightest-slate: #ccd6f6;
    --white: #e6f1ff;
    --red: #ff6b6b;
    --red-tint: rgba(255, 107, 107, 0.1);
    --pink: #ff6b6b;
    --light-blue: rgba(11, 172, 235, 0.1);
    --blue: #0badeb;
    --lightest-green: #64d8ff;
    --light-green: rgba(85, 217, 213, 0.1);
    --green: #55d9d4;

    /* Modern Gradients */
    --gradient-primary: linear-gradient(135deg, var(--blue) 0%, var(--green) 100%);
    --gradient-dark: linear-gradient(135deg, var(--dark-navy) 0%, var(--navy) 100%);
    --gradient-light: linear-gradient(135deg, var(--light-navy) 0%, var(--lightest-navy) 100%);

    /* Glass Effect */
    --glass-bg: rgba(17, 34, 64, 0.7);
    --glass-border: rgba(255, 255, 255, 0.1);
    --glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

    /* Animation Durations */
    --transition-fast: 0.2s;
    --transition-normal: 0.3s;
    --transition-slow: 0.5s;

    /* Existing Variables */
    --font-sans: 'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui,
      sans-serif;
    --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace;

    --fz-xxs: 12px;
    --fz-xs: 13px;
    --fz-sm: 16px;
    --fz-md: 18px;
    --fz-lg: 20px;
    --fz-xl: 22px;
    --fz-xxl: 24px;
    --fz-heading: 32px;

    --border-radius: 20px;
    --nav-height: 80px;
    --nav-scroll-height: 70px;

    --tab-height: 42px;
    --tab-width: 120px;

    --easing: cubic-bezier(0.645, 0.045, 0.355, 1);
    --transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);

    --hamburger-width: 30px;

    --ham-before: top 0.1s ease-in 0.25s, opacity 0.1s ease-in;
    --ham-before-active: top 0.1s ease-out, opacity 0.1s ease-out 0.12s;
    --ham-after: bottom 0.1s ease-in 0.25s, transform 0.22s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    --ham-after-active: bottom 0.1s ease-out,
      transform 0.22s cubic-bezier(0.215, 0.61, 0.355, 1) 0.12s;
  }
`;

export default variables;
