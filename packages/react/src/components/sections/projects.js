import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsSection = styled.section`
  width: 100%;
  background: var(--gradient-dark);
  padding: 100px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, var(--light-navy) 0%, transparent 50%);
    opacity: 0.5;
    z-index: 1;
  }

  h2 {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px 60px;
    text-align: center;
    position: relative;
    z-index: 2;
    font-size: clamp(24px, 5vw, var(--fz-heading));

    @media (max-width: 768px) {
      padding: 0 20px 40px;
    }
  }

  .archive-link {
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    &:after {
      bottom: 0.1em;
    }
  }

  .projects-grid {
    ${({ theme }) => theme.mixins.resetList};
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: repeat(3, minmax(250px, 1fr));
    grid-gap: 15px;
    position: relative;
    z-index: 2;

    @media (max-width: 800px) {
      grid-template-columns: repeat(2, minmax(300px, 1fr));
    }

    @media (max-width: 600px) {
      grid-template-columns: repeat(1, minmax(400px, 1fr));
      padding: 0 20px;
    }
  }

  .more-button {
    ${({ theme }) => theme.mixins.button};
    margin: 80px auto 0;
  }

  .note {
    max-width: 1200px;
    margin: 50px auto 0;
    padding: 0 40px;
    font-size: var(--fz-sm);
    color: var(--light-slate);
    font-style: italic;
    text-align: center;
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
      padding: 0 20px;
    }
  }
`;

const StyledProject = styled.div`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  align-items: flex-start;
  background: rgba(17, 34, 64, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 12px;
  padding: 40px;
  transition: var(--transition);
  z-index: 2;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--blue);
    box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
  }

  @media (max-width: 768px) {
    padding: 25px;
  }

  .project-inner {
    width: 100%;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 35px;
    width: 100%;

    .folder {
      color: var(--blue);
      svg {
        width: 30px;
        height: 30px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;
        color: var(--light-slate);
        transition: var(--transition);
        position: relative;
        z-index: 2;

        &:hover,
        &:focus {
          color: var(--blue);
        }

        &.external {
          svg {
            width: 22px;
            height: 22px;
            margin-top: -4px;
          }
        }

        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: clamp(24px, 5vw, 28px);
    margin-bottom: 20px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    width: 100%;

    a {
      position: static;
      text-decoration: none;
      color: inherit;
      width: 100%;
      display: block;
      transition: var(--transition);

      &:hover {
        color: var(--blue);
      }

      &:before {
        content: '';
        display: block;
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    }
  }

  .project-description {
    position: relative;
    z-index: 2;
    padding: 20px 0;
    background-color: transparent;
    color: var(--light-slate);
    font-size: var(--fz-lg);
    word-wrap: break-word;
    overflow-wrap: break-word;
    width: 100%;

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      font-size: var(--fz-md);
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px 0;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    list-style: none;
    padding: 0;

    @media (max-width: 768px) {
      margin: 20px 0 10px;
    }

    li {
      color: var(--light-slate);
      white-space: nowrap;
    }
  }

  .project-links {
    margin-top: 10px;
    margin-right: -10px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);

    a {
      padding: 10px;

      &:hover,
      &:focus {
        color: var(--blue);
      }

      &:focus-visible {
        color: var(--blue);
        outline: 2px solid var(--blue);
        outline-offset: 2px;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const Projects = () => {
  const data = useStaticQuery(graphql`
    query {
      projects: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/projects/" }
          frontmatter: { showInProjects: { ne: false } }
        }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              tech
              github
              external
            }
            html
          }
        }
      }
    }
  `);

  const [showMore] = useState(false);
  const revealTitle = useRef(null);
  const revealArchiveLink = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    sr.reveal(revealArchiveLink.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const GRID_LIMIT = 9;
  const projects = data.projects.edges.filter(({ node }) => node);
  const firstSix = projects.slice(0, GRID_LIMIT);
  const projectsToShow = showMore ? projects : firstSix;

  const projectInner = node => {
    const { frontmatter, html } = node;
    const { github, external, title, tech } = frontmatter;

    return (
      <div className="project-inner">
        <header>
          <div className="project-top">
            <div className="folder">
              <Icon name="Folder" />
            </div>
            <div className="project-links">
              {github && (
                <a href={github} aria-label="GitHub Link" target="_blank" rel="noreferrer">
                  <Icon name="GitHub" />
                </a>
              )}
              {external && (
                <a
                  href={external}
                  aria-label="External Link"
                  className="external"
                  target="_blank"
                  rel="noreferrer">
                  <Icon name="External" />
                </a>
              )}
            </div>
          </div>

          <h3 className="project-title">
            <a href={external} target="_blank" rel="noreferrer">
              {title}
            </a>
          </h3>

          <div className="project-description" dangerouslySetInnerHTML={{ __html: html }} />
        </header>

        <footer>
          {tech && (
            <ul className="project-tech-list">
              {tech.map((tech, i) => (
                <li key={i}>{tech}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledProjectsSection id="projects">
      <h2 ref={revealTitle}>Noteworthy Projects</h2>

      <ul className="projects-grid">
        {prefersReducedMotion ? (
          <>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <StyledProject key={i}>{projectInner(node)}</StyledProject>
              ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {projectsToShow &&
              projectsToShow.map(({ node }, i) => (
                <CSSTransition
                  key={i}
                  classNames="fadeup"
                  timeout={i >= GRID_LIMIT ? (i - GRID_LIMIT) * 300 : 300}
                  exit={false}>
                  <StyledProject
                    key={i}
                    ref={el => (revealProjects.current[i] = el)}
                    style={{
                      transitionDelay: `${i >= GRID_LIMIT ? (i - GRID_LIMIT) * 100 : 0}ms`,
                    }}>
                    {projectInner(node)}
                  </StyledProject>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </ul>

      <div className="note">
        Due to rights and confidentiality agreements, certain commercial projects are not featured.
      </div>
    </StyledProjectsSection>
  );
};

export default Projects;
