import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { navLinks } from '@config';
import { useScrollDirection } from '@hooks';
import { Menu } from '@components';
import { IconLogo, IconHex } from '@components/icons';

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 11;
  padding: 0px 24px;
  width: calc(100% - 40px);
  max-width: 1200px;
  height: var(--nav-height);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--border);
  border-radius: 999px;
  box-shadow: var(--shadow-md);

  @media (max-width: 1080px) {
    padding: 0 20px;
    width: calc(100% - 32px);
  }
  @media (max-width: 768px) {
    padding: 0 16px;
    width: calc(100% - 20px);
    top: 15px;
    border-radius: 15px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
    props.scrollDirection === 'up' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateX(-50%) translateY(0px);
        background-color: rgba(255, 255, 255, 0.95);
        box-shadow: var(--shadow-lg);
      `};

    ${props =>
    props.scrollDirection === 'down' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateX(-50%) translateY(calc(var(--nav-scroll-height) * -1 - 20px));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  height: 100%;
  color: var(--text-primary);
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;
  align-items: center;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};
    width: 44px;
    height: 44px;
    position: relative;
    z-index: 13;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    a {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 1;
      color: var(--accent);
      text-decoration: none;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: all var(--transition-normal) var(--easing);

      .hex-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.1;
        transition: opacity var(--transition-normal) var(--easing);

        svg {
          width: 100%;
          height: 100%;
        }
      }

      .logo-container {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          width: 100%;
          height: 100%;
          fill: none;
          user-select: none;
          transition: all var(--transition-normal) var(--easing);

          polygon {
            fill: var(--accent);
            stroke: var(--accent);
            stroke-width: 2;
          }

          path {
            stroke: var(--accent);
            stroke-width: 3;
          }
        }
      }

      &:hover,
      &:focus {
        outline: 0;
        background: var(--accent-light);

        .hex-container {
          opacity: 0.15;
        }

        .logo-container {
          svg {
            polygon {
              fill: var(--accent-hover);
              stroke: var(--accent-hover);
            }
            path {
              stroke: var(--accent-hover);
            }
          }
        }
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  flex: 1;
  justify-content: flex-end;

  @media (max-width: 768px) {
    display: none;
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  ol {
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;
    height: 100%;

    li {
      margin: 0 5px;
      position: relative;
      font-size: var(--fz-md);
      font-family: var(--font-sans);
      font-weight: 500;
      display: flex;
      align-items: center;
      height: 100%;

      a {
        padding: 10px;
        display: flex;
        align-items: center;
        height: 100%;
        color: var(--text-primary);
        text-decoration: none;
        transition: color var(--transition-normal) var(--easing);
        position: relative;
        white-space: nowrap;

        &:hover {
          color: var(--accent);
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    font-size: var(--fz-xs);
    background: var(--accent) !important;
    border: none !important;
    color: var(--text-light) !important;
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: 999px;
    transition: all var(--transition-normal) var(--easing);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.2;
    margin: 0 0 0 1.5rem;
    box-sizing: border-box;
    text-align: center;
    white-space: nowrap;
    box-shadow: none !important;
    transform: none !important;

    &:hover {
      background: var(--accent-hover) !important;
      color: var(--text-light) !important;
      box-shadow: none !important;
      transform: none !important;
    }
  }
`;

const StyledHamburger = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 13;
    width: var(--hamburger-width);
    height: var(--hamburger-width);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    flex-shrink: 0;

    &:hover {
      span {
        background: var(--blue);
      }
    }

    span {
      display: block;
      position: relative;
      width: var(--hamburger-width);
      height: 2px;
      background: var(--lightest-slate);
      transition: all var(--transition-normal) var(--easing);
      margin: 0 auto;

      &:before,
      &:after {
        content: '';
        position: absolute;
        width: var(--hamburger-width);
        height: 2px;
        background: var(--lightest-slate);
        transition: all var(--transition-normal) var(--easing);
      }

      &:before {
        top: -8px;
      }

      &:after {
        bottom: -8px;
      }
    }
  }
`;

const StyledMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 12;
    transform: translateX(100%);
    transition: transform var(--transition-normal) var(--easing);

    &.menu-open {
      transform: translateX(0);
    }

    nav {
      ${({ theme }) => theme.mixins.flexCenter};
      flex-direction: column;
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 50px;
      text-align: center;

      ol {
        width: 100%;
        padding: 0;
        margin: 0;
        list-style: none;

        li {
          position: relative;
          margin: 0;
          font-size: var(--fz-xl);
          counter-increment: item 1;

          a {
            ${({ theme }) => theme.mixins.link};
            width: 100%;
            padding: 3px 20px 20px;
            display: block;
            color: var(--text-primary);
            text-decoration: none;
            transition: color var(--transition-normal) var(--easing);

            &:hover {
              color: var(--accent);
            }

            &:before {
              content: '0' counter(item) '.';
              margin-right: 5px;
              color: var(--accent);
              font-size: var(--fz-sm);
              text-align: right;
            }
          }
        }
      }

      .resume-button {
        ${({ theme }) => theme.mixins.smallButton};
        margin-top: 20px;
        font-size: var(--fz-sm);
        background: var(--accent);
        border: none;
        color: var(--text-light);
        font-weight: 600;
        padding: 1rem 2rem;
        border-radius: 999px;
        transition: all var(--transition-normal) var(--easing);

        &:hover {
          background: var(--accent-hover);
          color: var(--text-light);
        }
      }
    }
  }
`;

const Nav = ({ isHome, isInitialLoad }) => {
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Logo = (
    <div className="logo" tabIndex="-1">
      {isHome ? (
        <a href="/" aria-label="home">
          <div className="hex-container">
            <IconHex />
          </div>
          <div className="logo-container">
            <IconLogo />
          </div>
        </a>
      ) : (
        <Link to="/" aria-label="home">
          <div className="hex-container">
            <IconHex />
          </div>
          <div className="logo-container">
            <IconLogo />
          </div>
        </Link>
      )}
    </div>
  );

  const ResumeLink = (
    <a className="resume-button" href="/resume.pdf" target="_blank" rel="noopener noreferrer">
      Resume
    </a>
  );

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <StyledHeader scrollDirection={scrollDirection} scrolledToTop={scrolledToTop}>
      <StyledNav>
        {Logo}
        <StyledLinks>
          <ol>
            {navLinks &&
              navLinks.map(({ url, name }, i) => (
                <li key={i}>
                  <Link to={url}>{name}</Link>
                </li>
              ))}
          </ol>
          <div>{ResumeLink}</div>
        </StyledLinks>
        <Menu />
      </StyledNav>

      <StyledMenu className={isMenuOpen ? 'menu-open' : ''}>
        <nav>
          <ol>
            {navLinks &&
              navLinks.map(({ url, name }, i) => (
                <li key={i}>
                  <a href={url} onClick={toggleMenu}>
                    {name}
                  </a>
                </li>
              ))}
          </ol>
          <a
            className="resume-button"
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={toggleMenu}>
            Resume
          </a>
        </nav>
      </StyledMenu>
    </StyledHeader>
  );
};

Nav.propTypes = {
  isHome: PropTypes.bool,
  isInitialLoad: PropTypes.bool,
};

export default Nav;
