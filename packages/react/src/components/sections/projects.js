import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsSection = styled.section`
  width: 100%;
  background: var(--bg-secondary);
  padding: 100px 0;
  position: relative;
  overflow: hidden;

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
    color: var(--text-secondary);
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
  background: var(--bg-primary);
  border: 2px solid var(--border);
  border-radius: 24px;
  padding: 2.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    border-color: var(--accent);
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 16px;
  }

  .project-inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .project-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 25px;
    width: 100%;

    .folder {
      color: var(--accent);
      svg {
        width: 30px;
        height: 30px;
      }
    }

    .project-links {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--text-secondary);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;
        color: var(--text-secondary);
        transition: color var(--transition-normal) var(--easing);
        position: relative;
        z-index: 2;

        &:hover,
        &:focus {
          color: var(--accent);
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
    color: var(--text-primary);
    font-size: clamp(20px, 4vw, 24px);
    margin-bottom: 15px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    width: 100%;
    line-height: 1.3;

    a {
      position: static;
      text-decoration: none;
      color: inherit;
      width: 100%;
      display: block;
      transition: color var(--transition-normal) var(--easing);

      &:hover {
        color: var(--accent);
      }
    }
  }

  .project-description {
    color: var(--text-secondary);
    font-size: var(--fz-md);
    line-height: 1.6;
    margin-bottom: 20px;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
    padding-top: 1.5rem;
    border-top: 2px solid var(--border);
    list-style: none;
    padding: 0;
    margin: 1.5rem 0 0.5rem 0;

    @media (max-width: 768px) {
      margin: 1.25rem 0 0.5rem;
      padding-top: 1.25rem;
    }

    li {
      color: var(--accent);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      padding: 8px 14px;
      background: var(--accent-light);
      border-radius: 12px;
      font-weight: 500;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      white-space: nowrap;
      margin: 0;
      border: 1px solid transparent;

      &:hover {
        background: var(--accent);
        color: var(--text-light);
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(37, 99, 235, 0.2);
        border-color: var(--accent);
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

  useEffect(() => {
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
        {projectsToShow &&
          projectsToShow.map(({ node }, i) => (
            <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
              {projectInner(node)}
            </StyledProject>
          ))}
      </ul>

      <div className="note">
        Due to rights and confidentiality agreements, certain commercial projects are not featured.
      </div>
    </StyledProjectsSection>
  );
};

export default Projects;
