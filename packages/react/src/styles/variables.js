import { css } from 'styled-components';

const variables = css`
  :root {
    /* Simplified Elegant Color Palette */
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-tertiary: #f1f3f5;
    --bg-dark: #0d1117;
    --bg-dark-secondary: #161b22;

    --text-primary: #1a1a1a;
    --text-secondary: #6b7280;
    --text-tertiary: #9ca3af;
    --text-light: #ffffff;
    --text-light-secondary: #e5e7eb;

    --accent: #2563eb;
    --accent-hover: #1d4ed8;
    --accent-light: rgba(37, 99, 235, 0.1);

    --border: #e5e7eb;
    --border-dark: #30363d;

    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

    /* Legacy color mappings for compatibility */
    --dark-navy: var(--bg-dark);
    --navy: var(--bg-dark-secondary);
    --light-navy: var(--bg-dark-secondary);
    --lightest-navy: var(--bg-dark-secondary);
    --navy-shadow: rgba(0, 0, 0, 0.3);
    --dark-slate: var(--text-secondary);
    --slate: var(--text-secondary);
    --light-slate: var(--text-tertiary);
    --lightest-slate: var(--text-primary);
    --white: var(--text-light);
    --blue: var(--accent);
    --green: var(--accent);
    --light-blue: var(--accent-light);

    /* Simplified Gradients */
    --gradient-primary: var(--accent);
    --gradient-dark: var(--bg-dark);
    --gradient-light: var(--bg-secondary);

    /* Glass Effect */
    --glass-bg: rgba(255, 255, 255, 0.8);
    --glass-border: var(--border);
    --glass-shadow: var(--shadow-md);

    /* Animation Durations */
    --transition-fast: 0.2s;
    --transition-normal: 0.3s;
    --transition-slow: 0.5s;

    /* Modern Font Stack */
    --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono',
      'Source Code Pro', monospace;

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
