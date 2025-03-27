import { createGlobalStyle } from 'styled-components';
import fonts from './fonts';
import variables from './variables';
import TransitionStyles from './TransitionStyles';
import PrismStyles from './PrismStyles';

const GlobalStyle = createGlobalStyle`
  ${fonts};
  ${variables};

  html {
    box-sizing: border-box;
    width: 100%;
    scroll-behavior: smooth;
    background: var(--dark-navy);
    color: var(--lightest-slate);
    font-family: var(--font-sans);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-sans);
    font-size: var(--fz-lg);
    line-height: 1.6;
    color: var(--lightest-slate);
    background: var(--dark-navy);
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  ::selection {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
  }

  /* Provide basic, default focus styles.*/
  :focus {
    outline: 2px dashed var(--blue);
    outline-offset: 3px;
  }

  /*
    Remove default focus styles for mouse users ONLY if
    :focus-visible is supported on this platform.
  */
  :focus:not(:focus-visible) {
    outline: none;
    outline-offset: 0px;
  }

  /*
    Optionally: If :focus-visible is supported on this
    platform, provide enhanced focus styles for keyboard
    focus.
  */
  :focus-visible {
    outline: 2px dashed var(--blue);
    outline-offset: 3px;
  }

  /* Smooth scrolling for the whole page */
  html {
    scroll-behavior: smooth;
  }

  /* Modern scrollbar styling */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--dark-navy);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--light-navy);
    border-radius: 5px;
    border: 2px solid var(--dark-navy);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--lightest-navy);
  }

  /* Smooth transitions for all interactive elements */
  a, button, input, textarea {
    transition: all var(--transition-normal) var(--easing);
  }

  /* Modern link styling */
  a {
    color: var(--blue);
    text-decoration: none;
    position: relative;

    &:hover {
      color: var(--green);
    }

    &.underline {
      text-decoration: none;
      position: relative;

      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -2px;
        left: 0;
        background: var(--gradient-primary);
        transform: scaleX(0);
        transform-origin: right;
        transition: transform var(--transition-normal) var(--easing);
      }

      &:hover:after {
        transform: scaleX(1);
        transform-origin: left;
      }
    }
  }

  /* Modern button styling */
  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    font: inherit;
    color: inherit;

    &:focus {
      outline: none;
    }
  }

  /* Modern input styling */
  input, textarea {
    background: var(--light-navy);
    border: 1px solid var(--lightest-navy);
    border-radius: var(--border-radius);
    padding: 0.75rem 1rem;
    color: var(--lightest-slate);
    font-family: var(--font-sans);
    font-size: var(--fz-sm);
    transition: all var(--transition-normal) var(--easing);

    &:focus {
      outline: none;
      border-color: var(--blue);
      box-shadow: 0 0 0 2px var(--light-blue);
    }
  }

  /* Modern card styling */
  .card {
    background: var(--light-navy);
    border-radius: var(--border-radius);
    padding: 2rem;
    transition: transform var(--transition-normal) var(--easing),
                box-shadow var(--transition-normal) var(--easing);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px -10px var(--navy-shadow);
    }
  }

  /* Modern section styling */
  section {
    padding: 100px 0;
    position: relative;
    overflow: hidden;

    &:nth-of-type(odd) {
      background: var(--gradient-dark);
    }

    &:nth-of-type(even) {
      background: var(--gradient-light);
    }
  }

  /* Modern heading styles */
  h1, h2, h3, h4, h5, h6 {
    color: var(--lightest-slate);
    margin: 0 0 10px;
    font-weight: 600;
    line-height: 1.1;
    font-family: var(--font-sans);
  }

  /* Modern paragraph styles */
  p {
    margin: 0 0 20px;
    color: var(--slate);
    line-height: 1.6;
    font-family: var(--font-sans);
  }

  /* Modern list styles */
  ul, ol {
    margin: 0 0 20px;
    padding-left: 20px;
    color: var(--slate);
    font-family: var(--font-sans);
  }

  li {
    margin-bottom: 10px;
  }

  /* Modern image styles */
  img {
    max-width: 100%;
    height: auto;
    border-radius: var(--border-radius);
  }

  /* Modern code block styles */
  pre, code {
    background: var(--light-navy);
    border-radius: var(--border-radius);
    padding: 0.5rem;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--lightest-slate);
  }

  /* Modern table styles */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 20px;
  }

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid var(--lightest-navy);
  }

  th {
    color: var(--lightest-slate);
    font-weight: 600;
  }

  td {
    color: var(--slate);
  }

  /* Modern form styles */
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  label {
    color: var(--lightest-slate);
    font-size: var(--fz-sm);
    margin-bottom: 5px;
  }

  /* Modern grid system */
  .grid {
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  /* Modern flexbox utilities */
  .flex {
    display: flex;
    gap: 20px;
  }

  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /* Modern spacing utilities */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Modern animation utilities */
  .fade-in {
    animation: fadeIn var(--transition-normal) var(--easing);
  }

  .slide-up {
    animation: slideUp var(--transition-normal) var(--easing);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${TransitionStyles};
  ${PrismStyles};
`;

export default GlobalStyle;
