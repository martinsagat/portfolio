import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { css } from 'styled-components';
import { navLinks } from '@config';
import { loaderDelay } from '@utils';
import { useScrollDirection, usePrefersReducedMotion } from '@hooks';
import { Menu } from '@components';
import { IconLogo, IconHex } from '@components/icons';

const StyledHeader = styled.header`
  ${({ theme }) => theme.mixins.flexBetween};
  position: fixed;
  top: 0;
  z-index: 11;
  padding: 0px 50px;
  width: 100%;
  height: var(--nav-height);
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--glass-border);
  transition: all var(--transition-normal) var(--easing);

  @media (max-width: 1080px) {
    padding: 0 40px;
  }
  @media (max-width: 768px) {
    padding: 0 25px;
  }

  @media (prefers-reduced-motion: no-preference) {
    ${props =>
    props.scrollDirection === 'up' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(0px);
        background-color: rgba(10, 25, 47, 0.85);
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};

    ${props =>
    props.scrollDirection === 'down' &&
      !props.scrolledToTop &&
      css`
        height: var(--nav-scroll-height);
        transform: translateY(calc(var(--nav-scroll-height) * -1));
        box-shadow: 0 10px 30px -10px var(--navy-shadow);
      `};
  }
`;

const StyledNav = styled.nav`
  ${({ theme }) => theme.mixins.flexBetween};
  position: relative;
  width: 100%;
  color: var(--lightest-slate);
  font-family: var(--font-mono);
  counter-reset: item 0;
  z-index: 12;

  .logo {
    ${({ theme }) => theme.mixins.flexCenter};
    width: 42px;
    height: 42px;
    position: relative;
    z-index: 13;

    a {
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 1;
      color: var(--blue);
      text-decoration: none;

      .hex-container {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        @media (prefers-reduced-motion: no-preference) {
          transition: var(--transition);
        }
      }

      .logo-container {
        position: relative;
        z-index: 1;
        svg {
          fill: none;
          user-select: none;
          @media (prefers-reduced-motion: no-preference) {
            transition: var(--transition);
          }
          polygon {
            fill: var(--navy);
          }
        }
      }

      &:hover,
      &:focus {
        outline: 0;
        transform: translate(-4px, -4px);
        .hex-container {
          transform: translate(4px, 3px);
        }
      }
    }
  }
`;

const StyledLinks = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  @media (max-width: 768px) {
    display: none;
  }

  ol {
    ${({ theme }) => theme.mixins.flexBetween};
    padding: 0;
    margin: 0;
    list-style: none;
    height: 100%;
    align-items: center;

    li {
      margin: 0 5px;
      position: relative;
      font-size: var(--fz-md);
      font-family: var(--font-sans);
      font-weight: 500;

      a {
        padding: 10px;
        display: flex;
        align-items: center;
        height: 100%;
        color: var(--lightest-slate);
        text-decoration: none;
        transition: color var(--transition-normal) var(--easing);
        position: relative;

        &:hover {
          color: var(--blue);
        }
      }
    }
  }

  .resume-button {
    ${({ theme }) => theme.mixins.smallButton};
    margin-left: 15px;
    font-size: var(--fz-xs);
    background: var(--gradient-primary);
    border: none;
    color: var(--dark-navy);
    font-weight: 600;
    padding: 0.75rem 1.5rem;
    border-radius: var(--border-radius);
    transition: all var(--transition-normal) var(--easing);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(11, 172, 235, 0.3);
    }
  }
`;

const StyledHamburger = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: relative;
    z-index: 13;
    width: var(--hamburger-width);
    height: var(--hamburger-width);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    margin: 0;

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
            color: var(--lightest-slate);
            text-decoration: none;
            transition: color var(--transition-normal) var(--easing);

            &:hover {
              color: var(--blue);
            }

            &:before {
              content: '0' counter(item) '.';
              margin-right: 5px;
              color: var(--blue);
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
        background: var(--gradient-primary);
        border: none;
        color: var(--dark-navy);
        font-weight: 600;
        padding: 1rem 2rem;
        border-radius: var(--border-radius);
        transition: all var(--transition-normal) var(--easing);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(11, 172, 235, 0.3);
        }
      }
    }
  }
`;

const Nav = ({ isHome, isInitialLoad }) => {
  const [isMounted, setIsMounted] = useState(false);
  const scrollDirection = useScrollDirection('down');
  const [scrolledToTop, setScrolledToTop] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = () => {
    setScrolledToTop(window.pageYOffset < 50);
  };

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    if (isInitialLoad) {
      const timeout = setTimeout(() => {
        setIsMounted(true);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setIsMounted(true);
    }
  }, [isInitialLoad, prefersReducedMotion]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const timeout = isInitialLoad ? loaderDelay : 0;
  const fadeClass = isInitialLoad ? 'fade' : '';
  const fadeDownClass = isInitialLoad ? 'fadedown' : '';

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
        {prefersReducedMotion ? (
          <>
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
          </>
        ) : (
          <>
            {isInitialLoad ? (
              <>
                <TransitionGroup component={null}>
                  {isMounted && (
                    <CSSTransition classNames={fadeClass} timeout={timeout}>
                      <>{Logo}</>
                    </CSSTransition>
                  )}
                </TransitionGroup>

                <StyledLinks>
                  <ol>
                    <TransitionGroup component={null}>
                      {isMounted &&
                        navLinks &&
                        navLinks.map(({ url, name }, i) => (
                          <CSSTransition key={i} classNames={fadeDownClass} timeout={timeout}>
                            <li key={i} style={{ transitionDelay: `${i * 100}ms` }}>
                              <Link to={url}>{name}</Link>
                            </li>
                          </CSSTransition>
                        ))}
                    </TransitionGroup>
                  </ol>

                  <TransitionGroup component={null}>
                    {isMounted && (
                      <CSSTransition classNames={fadeDownClass} timeout={timeout}>
                        <div style={{ transitionDelay: `${navLinks.length * 100}ms` }}>
                          {ResumeLink}
                        </div>
                      </CSSTransition>
                    )}
                  </TransitionGroup>
                </StyledLinks>

                <TransitionGroup component={null}>
                  {isMounted && (
                    <CSSTransition classNames={fadeClass} timeout={timeout}>
                      <Menu />
                    </CSSTransition>
                  )}
                </TransitionGroup>
              </>
            ) : (
              <>
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
              </>
            )}
          </>
        )}
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
