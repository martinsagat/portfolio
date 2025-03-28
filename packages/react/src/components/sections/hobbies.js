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
`;

const StyledProject = styled.li`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(12, 1fr);
  align-items: center;
  cursor: default;

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
    padding: 2rem;
    background: var(--light-navy);
    border-radius: var(--border-radius);
  }

  &:not(:last-of-type) {
    margin-bottom: 100px;

    @media (max-width: 768px) {
      margin-bottom: 70px;
    }

    @media (max-width: 480px) {
      margin-bottom: 30px;
    }
  }

  .project-content {
    position: relative;
    grid-column: 1 / 7;
    grid-row: 1 / -1;
    z-index: 2;

    @media (max-width: 1080px) {
      grid-column: 1 / 9;
    }

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      grid-column: 1 / -1;
      padding: 0;
      z-index: 5;
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
  }

  .project-title {
    color: var(--lightest-slate);
    font-size: var(--fz-heading);

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
    background-color: var(--light-navy);
    color: var(--light-slate);
    font-size: var(--fz-lg);
    line-height: 1.6;

    @media (max-width: 768px) {
      padding: 20px 0;
      background-color: transparent;
      box-shadow: none;

      &:hover {
        box-shadow: none;
      }
    }

    a {
      ${({ theme }) => theme.mixins.inlineLink};
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
      margin: 10px 0;

      li {
        margin: 0 10px 5px 0;
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
    grid-column: 6 / -1;
    grid-row: 1 / -1;
    position: relative;
    z-index: 1;
    max-width: 400px;
    margin: 0 auto;

    @media (max-width: 768px) {
      grid-column: 1 / -1;
      margin: 20px auto 0;
      height: 100%;
      opacity: 1;
      max-width: 300px;
    }

    a {
      width: 100%;
      height: 100%;
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
          padding: '0 40px 60px',
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
          padding: '0 40px',
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
