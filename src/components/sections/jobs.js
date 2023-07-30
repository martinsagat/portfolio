import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const StyledJobsSection = styled.section`
  max-width: 990px;

  .inner {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    @media (max-width: 600px) {
      display: block;
    }

    // Prevent container from jumping
    @media (min-width: 700px) {
      min-height: 340px;
    }
  }
`;

const JobCard = styled.div`
  position: relative;
  padding: 25px;
  flex: 1;
  margin-bottom: 30px;
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    background-color: var(--light-navy);
  }

  max-width: 800px;
  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  @media (max-width: 600px) {
    margin-bottom: 50px;
  }

  .job-title {
    margin-bottom: 5px;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    font-weight: 500;
  }

  .job-card-company {
    color: var(--blue);
    font-size: var(--fz-xl);
    font-weight: 500;
  }

  .job-description {
    padding-top: 30px;
    padding-bottom: 10px;
    max-width: 600px;
  }

  .job-logo-wrapper {
    float: right;
    position: relative;
    width: 70px;
    height: 70px;
    background-color: var(--light-blue);
    border-radius: 50%;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 0 0 20px;
  }

  .job-logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .job-tech-chip {
    display: inline-block;
    padding: 7px 10px 10px 10px;
    margin: 0 10px 10px 0;
    background-color: var(--light-blue);
    color: var(--blue);
    border-radius: 20px;
    font-weight: 500;
    font-size: var(--fz-sm);
    height: 30px;
    align-items: center;
    justify-content: center;
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
    }
  `);

  const jobsData = data.jobs.edges;
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

  return (
    <StyledJobsSection id="jobs" ref={revealContainer}>
      <h2 className="numbered-heading">Where I’ve Worked</h2>
      <div className="inner">
        {jobsData.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { title, range, logo, company, url, tech } = frontmatter;
          const logoImage = getImage(logo);

          return (
            <JobCard key={i}>
              <div className="job-logo-wrapper">
                <GatsbyImage className="job-logo" image={logoImage} alt={title} />
              </div>
              <h3 className="job-title">
                {title}{' '}
                <span className="job-card-company">
                  &nbsp;@&nbsp;
                  <a href={url} className="inline-link">
                    {company}
                  </a>
                </span>
              </h3>
              <p className="job-company">
                <span className="job-dates">{range}</span>
              </p>

              <div className="job-description" dangerouslySetInnerHTML={{ __html: html }} />
              <div>
                {tech &&
                  tech.map((tech, i) => (
                    <div className="job-tech-chip" key={i}>
                      {tech}
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
