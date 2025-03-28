import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { StaticImage } from 'gatsby-plugin-image';

const StyledJobsSection = styled.section`
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

  .numbered-heading {
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

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;

    @media (max-width: 600px) {
      display: block;
      text-align: center;
      padding: 0 20px;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const StyledJob = styled.div`
  position: relative;
  padding: 2rem;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  box-shadow: var(--glass-shadow);
  transition: var(--transition);
  z-index: 2;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--blue);
    box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  .job-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    flex-wrap: nowrap;
    gap: 1rem;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }

  .job-title {
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
    font-weight: 600;
    margin: 0;
    white-space: nowrap;
  }

  .job-date {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    white-space: nowrap;
  }

  .job-company {
    color: var(--blue);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    margin-bottom: 1rem;
    white-space: nowrap;
  }

  .job-description {
    color: var(--light-slate);
    font-size: var(--fz-md);
    line-height: 1.6;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--blue);
      }
    }
  }
`;

const JobCard = styled.div`
  position: relative;
  padding: 2.5rem;
  flex: 1;
  margin-bottom: 2rem;
  border-radius: var(--border-radius);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(17, 34, 64, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.1);
  max-width: 800px;
  width: 100%;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, rgba(100, 255, 218, 0.1) 0%, transparent 50%);
    opacity: 0;
    transition: opacity 0.4s ease;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(100, 255, 218, 0.3);
    box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);

    &::before {
      opacity: 1;
    }
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  @media (max-width: 600px) {
    margin-bottom: 3rem;
    padding: 2rem;
  }

  .job-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 2rem;
    gap: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(100, 255, 218, 0.1);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 0;
      height: 1px;
      background: var(--gradient-primary);
      transition: width 0.4s ease;
    }

    &:hover::after {
      width: 100%;
    }

    @media (max-width: 600px) {
      gap: 1.5rem;
      margin-bottom: 1.5rem;
    }
  }

  .job-logo-wrapper {
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    background: rgba(100, 255, 218, 0.1);
    border-radius: 12px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: 0.5s;
    }

    &:hover {
      transform: translateY(-3px) scale(1.05);
      background: rgba(100, 255, 218, 0.2);
      box-shadow: 0 5px 15px rgba(100, 255, 218, 0.2);

      &::before {
        left: 100%;
      }
    }

    .job-logo {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.4s ease;
    }
  }

  .job-title {
    margin: 0;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.5px;
    transition: color 0.4s ease;

    @media (max-width: 600px) {
      font-size: var(--fz-xl);
    }
  }

  .job-card-company {
    color: var(--blue);
    font-size: var(--fz-lg);
    font-weight: 500;
    margin-top: 0.5rem;
    display: block;
    text-align: left;
    transition: color 0.4s ease;

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
  }

  .job-dates {
    color: var(--light-slate);
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    margin-top: 0.5rem;
    display: block;
    text-align: left;
  }

  .job-description {
    padding-top: 0.5rem;
    padding-bottom: 1.5rem;
    max-width: 600px;
    text-align: left;

    p {
      margin-bottom: 1.25rem;
      color: var(--light-slate);
      line-height: 1.8;
      font-size: var(--fz-md);
      text-align: left;

      &:last-child {
        margin-bottom: 0;
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      text-align: left;
    }

    li {
      margin-bottom: 1rem;
      color: var(--light-slate);
      line-height: 1.8;
      font-size: var(--fz-md);
      padding-left: 1.5rem;
      position: relative;
      text-align: left;
      transition: transform 0.4s ease;

      &:hover {
        transform: translateX(5px);
      }

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--blue);
      }

      &:last-child {
        margin-bottom: 0;
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
    }
  }

  .job-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(100, 255, 218, 0.1);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: -1px;
      left: 0;
      width: 0;
      height: 1px;
      background: var(--gradient-primary);
      transition: width 0.4s ease;
    }

    &:hover::after {
      width: 100%;
    }
  }

  .job-tech-chip {
    display: flex;
    align-items: center;
    padding: 6px 12px;
    background: rgba(100, 255, 218, 0.1);
    border-radius: 20px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--light-slate);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: 0.5s;
    }

    &:hover {
      background: rgba(100, 255, 218, 0.2);
      transform: translateY(-2px);
      color: var(--lightest-slate);

      &::before {
        left: 100%;
      }
    }
  }
`;

const Jobs = () => {
  const data = useStaticQuery(graphql`
    query {
      jobs: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/content/jobs/" } }
        sort: { fields: [frontmatter___date], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              location
              range
              url
              tech
              logo {
                childImageSharp {
                  gatsbyImageData(
                    width: 700
                    formats: [AUTO, WEBP, AVIF]
                    quality: 100
                    placeholder: BLURRED
                    layout: FULL_WIDTH
                  )
                }
              }
            }
            html
          }
        }
      }
      techIcons: allFile(filter: { relativeDirectory: { eq: "images/stack" } }) {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              gatsbyImageData(
                width: 16
                height: 16
                formats: [AUTO, WEBP, AVIF]
                quality: 100
                placeholder: BLURRED
                layout: FIXED
              )
            }
          }
        }
      }
    }
  `);

  const jobsData = data.jobs.edges;
  const techIcons = data.techIcons.edges.reduce((acc, { node }) => {
    acc[node.name] = node.childImageSharp.gatsbyImageData;
    return acc;
  }, {});

  const [tabFocus, setTabFocus] = useState(null);
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const focusTab = () => {
    if (tabs.current[tabFocus]) {
      tabs.current[tabFocus].focus();
      return;
    }
    // If we're at the end, go to the start
    if (tabFocus >= tabs.current.length) {
      setTabFocus(0);
    }
    // If we're at the start, move to the end
    if (tabFocus < 0) {
      setTabFocus(tabs.current.length - 1);
    }
  };

  // Only re-run the effect if tabFocus changes
  useEffect(() => focusTab(), [tabFocus]);

  const getTechIcon = tech => {
    const techLower = tech.toLowerCase();
    const iconData = techIcons[techLower];
    if (iconData) {
      return <GatsbyImage className="tech-icon" image={iconData} alt={tech} />;
    }
    return null;
  };

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">Where I've Worked</h2>
      <div className="inner">
        {jobsData.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { title, range, logo, company, url, tech } = frontmatter;
          const logoImage = getImage(logo);

          return (
            <JobCard key={i}>
              <div className="job-header">
                <div className="job-logo-wrapper">
                  <GatsbyImage className="job-logo" image={logoImage} alt={title} />
                </div>
                <div>
                  <h3 className="job-title">{title}</h3>
                  <span className="job-card-company">
                    @{' '}
                    <a href={url} className="inline-link">
                      {company}
                    </a>
                  </span>
                  <span className="job-dates">{range}</span>
                </div>
              </div>

              <div className="job-description" dangerouslySetInnerHTML={{ __html: html }} />
              <div className="job-tech-list">
                {tech &&
                  tech.map((tech, i) => (
                    <div className="job-tech-chip" key={i}>
                      <span>{tech}</span>
                    </div>
                  ))}
              </div>
            </JobCard>
          );
        })}
      </div>
    </StyledJobsSection>
  );
};

export default Jobs;
