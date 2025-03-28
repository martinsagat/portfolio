import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};

  a {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 0 10px;
  }

  @media (max-width: 480px) {
    padding: 0 5px;
  }
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  cursor: default;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .project-inner {
        transform: translateY(-7px);
      }
    }
  }

  @media (max-width: 768px) {
    ${({ theme }) => theme.mixins.boxShadow};
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    background: var(--light-navy);
    border-radius: var(--border-radius);
    max-width: 600px;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    max-width: 100%;
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 40px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 8;
    grid-row: 1 / -1;
    z-index: 2;
    max-width: 600px;
    margin: 0 auto;

    @media (max-width: 1080px) {
      grid-column: 1 / 10;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 0;
      z-index: 5;
      max-width: 100%;
    }

    @media (max-width: 480px) {
      padding: 0;
    }
  }

  .project-overline {
    margin: 10px 0;
    color: var(--blue);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    font-weight: 400;
    text-align: center;
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: var(--fz-heading);
    text-align: center;

    @media (min-width: 768px) {
      margin: 0 0 20px;
    }

    @media (max-width: 768px) {
      color: var(--white);
      margin: 0 0 10px;
    }
  }

  .project-description {
    position: relative;
    z-index: 2;
    padding: 25px;
    border-radius: var(--border-radius);
    background: rgba(17, 34, 64, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(100, 255, 218, 0.1);
    color: var(--light-slate);
    font-size: var(--fz-lg);
    line-height: 1.6;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 0 auto;
    transform: translateX(20px);

    @media (max-width: 768px) {
      padding: 20px;
      background: rgba(17, 34, 64, 0.8);
      max-width: 100%;
      transform: none;
    }

    @media (max-width: 480px) {
      padding: 15px;
    }

    @media (min-width: 769px) {
      &:hover {
        transform: translateX(20px) translateY(-2px);
        border-color: rgba(100, 255, 218, 0.3);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
      }
    }

    a {
      color: var(--blue);
      text-decoration: none;
      transition: all 0.4s ease;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: var(--gradient-primary);
        transition: width 0.4s ease;
      }

      &:hover {
        color: var(--green);

        &::after {
          width: 100%;
        }
      }
    }

    strong {
      color: var(--white);
      font-weight: normal;
    }
  }

  .project-tech-list {
    display: flex;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
    margin: 25px 0 10px;
    padding: 0;
    list-style: none;

    li {
      margin: 0 20px 5px 0;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      white-space: nowrap;
    }

    @media (max-width: 768px) {
      margin: 8px 0;

      li {
        margin: 0 8px 5px 0;
        color: var(--lightest-slate);
      }
    }
  }

  .project-links {
    display: flex;
    align-items: center;
    position: relative;
    margin-top: 10px;
    margin-left: -10px;
    color: var(--lightest-slate);

    a {
      ${({ theme }) => theme.mixins.flexCenter};
      padding: 10px;

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

    .cta {
      ${({ theme }) => theme.mixins.smallButton};
      margin: 10px;
    }
  }

  .project-image {
    ${({ theme }) => theme.mixins.boxShadow};
    grid-column: 5 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
    max-width: 400px;
    margin: 0 auto;
    transform: translateX(-20px);

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      margin: 20px auto 0;
      height: 100%;
      opacity: 1;
      max-width: 280px;
      transform: none;
    }

    @media (max-width: 480px) {
      margin: 15px auto 0;
      max-width: 240px;
    }

    a {
      width: 100%;
      height: 100%;
      background-color: var(--blue);
      border-radius: var(--border-radius);
      vertical-align: middle;
    }

    .img {
      border-radius: var(--border-radius);
      width: 100%;
      height: auto;
      object-fit: cover;

      @media (max-width: 768px) {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/hobbies/" } }
        sort: { fields: [frontmatter___date], order: ASC }
      ) {
        edges {
          node {
            frontmatter {
              title
              type
              cover {
                childImageSharp {
                  gatsbyImageData(
                    width: 1200
                    quality: 100
                    formats: [AUTO, WEBP, AVIF]
                    placeholder: BLURRED
                    layout: CONSTRAINED
                  )
                }
              }
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

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    // Only apply scroll reveal on desktop
    if (window.innerWidth > 768) {
      sr.reveal(revealTitle.current, srConfig());
      revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
    }
  }, []);

  return (
    <section
      id="interests"
      style={{
        width: '100%',
        background: 'var(--gradient-dark)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
      <div
        style={{
          content: '',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, var(--light-navy) 0%, transparent 50%)',
          opacity: 0.5,
          zIndex: 1,
        }}
      />

      <h2
        className="numbered-heading"
        ref={revealTitle}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px 40px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
          fontSize: 'clamp(24px, 5vw, var(--fz-heading))',
        }}>
        When I don't work...
      </h2>

      <StyledProjectsGrid
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          position: 'relative',
          zIndex: 2,
        }}>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, github, cover, type } = frontmatter;
            const image = getImage(cover);

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="project-content">
                  <div>
                    <p className="project-overline">{type}</p>

                    <h3 className="project-title">
                      <a href={external}>{title}</a>
                    </h3>

                    <div
                      className="project-description"
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  </div>
                </div>

                <div className="project-image">
                  <a href={external ? external : github ? github : '#'}>
                    <GatsbyImage image={image} alt={title} className="img" />
                  </a>
                </div>
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
