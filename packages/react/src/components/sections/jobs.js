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
  background: var(--bg-secondary);
  padding: 100px 0;
  position: relative;
  overflow: hidden;

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
      text-align: left;
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
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal) var(--easing);
  z-index: 2;

  &:hover {
    border-color: var(--accent);
    box-shadow: var(--shadow-md);
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  .job-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 2rem;
    gap: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border);
    position: relative;
    width: 100%;

    @media (max-width: 600px) {
      gap: 1.5rem;
      margin-bottom: 1.5rem;
      flex-direction: row;
      align-items: flex-start;
    }

    > div:last-child {
      display: flex;
      flex-direction: column;
      gap: 0;
      width: 100%;
    }
  }

  .job-logo-wrapper {
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
    border-radius: 12px;
    transition: all var(--transition-normal) var(--easing);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;

    &:hover {
      border-color: var(--accent);
    }

    .job-logo {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .job-title {
    margin: 0;
    color: var(--text-primary);
    font-size: var(--fz-xxl);
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.02em;
    margin-bottom: 0.25rem;
    text-align: left;
    width: 100%;

    @media (max-width: 600px) {
      font-size: var(--fz-xl);
      text-align: left;
    }
  }

  .job-card-company {
    color: var(--accent);
    font-size: var(--fz-lg);
    font-weight: 500;
    display: block;
    text-align: left;
    margin-bottom: 0.25rem;

    @media (max-width: 600px) {
      text-align: left;
    }

    a {
      color: var(--accent);
      text-decoration: none;
      transition: color var(--transition-normal) var(--easing);

      &:hover {
        color: var(--accent-hover);
      }
    }
  }

  .job-dates {
    color: var(--text-secondary);
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    display: block;
    text-align: left;

    @media (max-width: 600px) {
      text-align: left;
    }
  }

  .job-description {
    color: var(--text-secondary);
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
        color: var(--accent);
      }
    }
  }
`;

const JobCard = styled.div`
  position: relative;
  padding: 2.5rem;
  flex: 1;
  margin-bottom: 2.5rem;
  border-radius: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--bg-primary);
  border: 2px solid var(--border);
  max-width: 850px;
  width: 100%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    border-color: var(--accent);
    box-shadow: 0 8px 24px rgba(37, 99, 235, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    padding: 2rem;
    margin-bottom: 2rem;
    border-radius: 20px;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    border-radius: 16px;
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
    padding-bottom: 1.75rem;
    border-bottom: 2px solid var(--border);
    position: relative;

    @media (max-width: 600px) {
      gap: 1.5rem;
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
    }

    > div:last-child {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      flex: 1;
    }
  }

  .job-logo-wrapper {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    background: var(--bg-secondary);
    border-radius: 16px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    position: relative;
    overflow: hidden;
    border: 2px solid var(--border);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(120deg, transparent, rgba(37, 99, 235, 0.1), transparent);
      transition: 0.5s;
    }

    &:hover {
      transform: translateY(-2px) scale(1.03);
      border-color: var(--accent);
      background: var(--accent-light);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.15);

      &::before {
        left: 100%;
      }
    }

    .job-logo {
      width: 100%;
      height: 100%;
      object-fit: contain;
      transition: transform 0.3s ease;
      filter: grayscale(10%);
    }

    &:hover .job-logo {
      filter: grayscale(0%);
      transform: scale(1.05);
    }

    @media (max-width: 600px) {
      width: 70px;
      height: 70px;
      padding: 10px;
      border-radius: 14px;
    }
  }

  .job-title {
    margin: 0;
    color: var(--text-primary);
    font-size: var(--fz-xxl);
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.02em;
    margin-bottom: 0;

    @media (max-width: 600px) {
      font-size: var(--fz-xl);
    }
  }

  .job-card-company {
    color: var(--accent);
    font-size: var(--fz-lg);
    font-weight: 600;
    display: block;
    text-align: left;
    margin-bottom: 0;

    a {
      color: var(--accent);
      text-decoration: none;
      transition: color var(--transition-normal) var(--easing);
      font-weight: 600;

      &:hover {
        color: var(--accent-hover);
        text-decoration: underline;
      }
    }
  }

  .job-dates {
    color: var(--text-secondary);
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    display: block;
    text-align: left;
    margin-top: 0.25rem;
    opacity: 0.8;
  }

  .job-description {
    padding-top: 0.75rem;
    padding-bottom: 0;
    max-width: 100%;
    text-align: left;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding-bottom 0.3s ease;

    &.collapsed {
      max-height: 200px;
      position: relative;
      padding-bottom: 1.5rem;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: linear-gradient(to bottom, transparent, var(--bg-primary));
        pointer-events: none;
      }
    }

    &.expanded {
      max-height: 5000px;
      padding-bottom: 1.5rem;
    }

    p {
      margin-bottom: 1.25rem;
      color: var(--text-secondary);
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
      color: var(--text-secondary);
      line-height: 1.75;
      font-size: var(--fz-md);
      padding-left: 1.75rem;
      position: relative;
      text-align: left;

      &:before {
        content: '▹';
        position: absolute;
        left: 0.5rem;
        color: var(--accent);
        font-size: var(--fz-sm);
        font-weight: 600;
      }

      &:last-child {
        margin-bottom: 0;
      }

      a {
        color: var(--accent);
        text-decoration: none;
        transition: color var(--transition-normal) var(--easing);
        font-weight: 500;

        &:hover {
          color: var(--accent-hover);
          text-decoration: underline;
        }
      }
    }
  }

  .expand-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 0.75rem 1.5rem;
    margin-top: 1rem;
    background: var(--accent-light);
    border: 2px solid var(--accent);
    border-radius: 999px;
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    width: 100%;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;

    &:hover {
      background: var(--accent);
      color: var(--text-light);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }

    &:active {
      transform: translateY(0);
    }

    svg {
      width: 16px;
      height: 16px;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &.expanded svg {
      transform: rotate(180deg);
    }

    @media (max-width: 480px) {
      padding: 0.625rem 1.25rem;
      font-size: var(--fz-xs);
    }
  }

  .job-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 2px solid var(--border);
  }

  .job-tech-chip {
    display: inline-flex;
    align-items: center;
    padding: 8px 14px;
    background: var(--accent-light);
    border-radius: 12px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--accent);
    font-weight: 500;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    border: 1px solid transparent;

    &:hover {
      background: var(--accent);
      color: var(--text-light);
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(37, 99, 235, 0.2);
      border-color: var(--accent);
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
  const [expandedCards, setExpandedCards] = useState({});
  const tabs = useRef([]);
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const toggleCard = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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
          const isExpanded = expandedCards[i];

          return (
            <JobCard key={i}>
              <div className="job-header">
                <div className="job-logo-wrapper">
                  <GatsbyImage className="job-logo" image={logoImage} alt={title} />
                </div>
                <div>
                  <h3 className="job-title">{title}</h3>
                  <span className="job-card-company">
                    @<a href={url} className="inline-link">
                      {company}
                    </a>
                  </span>
                  <span className="job-dates">{range}</span>
                </div>
              </div>

              <div 
                className={`job-description ${isExpanded ? 'expanded' : 'collapsed'}`}
                dangerouslySetInnerHTML={{ __html: html }} 
              />
              
              <button
                className={`expand-button ${isExpanded ? 'expanded' : ''}`}
                onClick={() => toggleCard(i)}
                aria-expanded={isExpanded}
                aria-label={isExpanded ? 'Collapse details' : 'Expand details'}>
                {isExpanded ? 'Show Less' : 'Show More'}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>

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
