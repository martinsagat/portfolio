import React, { useState, useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { StaticImage } from 'gatsby-plugin-image';

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
  padding: 2rem;
  flex: 1;
  margin-bottom: 2rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  background-color: var(--light-navy);
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(100, 255, 218, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-lg);
    border-color: rgba(100, 255, 218, 0.2);
  }

  max-width: 800px;
  ul {
    ${({ theme }) => theme.mixins.fancyList};
  }

  @media (max-width: 600px) {
    margin-bottom: 3rem;
    padding: 1.5rem;
  }

  .job-header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1.5rem;
    gap: 1.5rem;
  }

  .job-logo-wrapper {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    background-color: var(--light-blue);
    border-radius: 12px;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--shadow-sm);
    padding: 8px;

    &:hover {
      transform: scale(1.05);
    }
  }

  .job-logo {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: contain;
  }

  .job-title {
    margin: 0;
    color: var(--lightest-slate);
    font-size: var(--fz-xxl);
    font-weight: 600;
    line-height: 1.3;
  }

  .job-card-company {
    color: var(--blue);
    font-size: var(--fz-lg);
    font-weight: 500;
    margin-top: 0.25rem;
  }

  .job-dates {
    color: var(--light-slate);
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    margin-top: 0.5rem;
    display: block;
  }

  .job-description {
    padding-top: 1.5rem;
    padding-bottom: 1rem;
    max-width: 600px;
    border-top: 1px solid rgba(100, 255, 218, 0.1);

    p {
      margin-bottom: 1rem;
      color: var(--light-slate);
      line-height: 1.7;
      font-size: var(--fz-md);
    }

    li {
      margin-bottom: 0.75rem;
      color: var(--light-slate);
      line-height: 1.7;
      font-size: var(--fz-md);
      padding-left: 1.5rem;
      position: relative;

      &:before {
        content: "▹";
        position: absolute;
        left: 0;
        color: var(--blue);
      }

      a {
        ${({ theme }) => theme.mixins.inlineLink};
      }
    }
  }

  .job-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(100, 255, 218, 0.1);
    justify-content: center;
  }

  .job-tech-chip {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.5rem;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: rgba(100, 255, 218, 0.1);
    color: var(--blue);
    border-radius: 20px;
    font-weight: 500;
    font-size: var(--fz-sm);
    transition: var(--transition);
    border: 1px solid rgba(100, 255, 218, 0.2);
    min-width: 100px;
    height: 36px;
    text-align: center;
    flex: 0 0 auto;
    margin: 0;

    .tech-icon {
      width: 16px;
      height: 16px;
      object-fit: contain;
    }

    // When there's no icon, center the text
    &:not(:has(.tech-icon)) {
      grid-template-columns: 1fr;
      justify-items: center;
    }

    &:hover {
      transform: translateY(-2px);
      background-color: rgba(100, 255, 218, 0.15);
      box-shadow: var(--shadow-sm);
    }
  }

  .job-achievement {
    color: var(--green);
    font-weight: 500;
    margin-left: 0.5rem;
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

  const getTechIcon = (tech) => {
    const techLower = tech.toLowerCase();
    switch (techLower) {
      case 'react':
      case 'reactjs':
      case 'react.js':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/react.png" width={16} height={16} />;
      case 'javascript':
      case 'js':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/js.png" width={16} height={16} />;
      case 'typescript':
      case 'ts':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/typescript.png" width={16} height={16} />;
      case 'node':
      case 'nodejs':
      case 'node.js':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/node.png" width={16} height={16} />;
      case 'python':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/python.png" width={16} height={16} />;
      case 'aws':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/aws.png" width={16} height={16} />;
      case 'docker':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/docker.png" width={16} height={16} />;
      case 'kubernetes':
      case 'k8s':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/kubernetes.png" width={16} height={16} />;
      case 'graphql':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/graphql.png" width={16} height={16} />;
      case 'git':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/git.png" width={16} height={16} />;
      case 'vue':
      case 'vue.js':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/vue.png" width={16} height={16} />;
      case 'mysql':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/mysql.png" width={16} height={16} />;
      case 'postgresql':
      case 'postgres':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/postgresql.png" width={16} height={16} />;
      case 'mongodb':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/mongodb.png" width={16} height={16} />;
      case 'angular':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/angular.png" width={16} height={16} />;
      case 'next':
      case 'next.js':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/nextjs.png" width={16} height={16} />;
      case 'nestjs':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/nestjs.png" width={16} height={16} />;
      case 'express':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/express.png" width={16} height={16} />;
      case 'webpack':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/webpack.png" width={16} height={16} />;
      case 'jest':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/jest.png" width={16} height={16} />;
      case 'cypress':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/cypress.png" width={16} height={16} />;
      case 'tailwind':
      case 'tailwindcss':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/tailwind.png" width={16} height={16} />;
      case 'sass':
      case 'scss':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/sass.png" width={16} height={16} />;
      case 'less':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/less.png" width={16} height={16} />;
      case 'redux':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/redux.png" width={16} height={16} />;
      case 'gatsby':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/gatsby.png" width={16} height={16} />;
      case 'wordpress':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/wordpress.png" width={16} height={16} />;
      case 'php':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/php.png" width={16} height={16} />;
      case 'laravel':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/laravel.png" width={16} height={16} />;
      case 'symfony':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/symfony.png" width={16} height={16} />;
      case 'dotnet':
      case '.net':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/net.png" width={16} height={16} />;
      case 'csharp':
      case 'c#':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/csharp.png" width={16} height={16} />;
      case 'java':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/java.png" width={16} height={16} />;
      case 'spring':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/spring.png" width={16} height={16} />;
      case 'ruby':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/ruby.png" width={16} height={16} />;
      case 'rails':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/rails.png" width={16} height={16} />;
      case 'go':
      case 'golang':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/go.png" width={16} height={16} />;
      case 'terraform':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/terraform.png" width={16} height={16} />;
      case 'jenkins':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/jenkins.png" width={16} height={16} />;
      case 'circleci':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/circleci.png" width={16} height={16} />;
      case 'github':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/github.png" width={16} height={16} />;
      case 'gitlab':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/gitlab.png" width={16} height={16} />;
      case 'bitbucket':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/bitbucket.png" width={16} height={16} />;
      case 'jira':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/jira.png" width={16} height={16} />;
      case 'confluence':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/confluence.png" width={16} height={16} />;
      case 'slack':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/slack.png" width={16} height={16} />;
      case 'azure':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/azure.png" width={16} height={16} />;
      case 'gcp':
      case 'google cloud':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/gcp.png" width={16} height={16} />;
      case 'firebase':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/firebase.png" width={16} height={16} />;
      case 'heroku':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/heroku.png" width={16} height={16} />;
      case 'netlify':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/netlify.png" width={16} height={16} />;
      case 'vercel':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/vercel.png" width={16} height={16} />;
      case 'camunda':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/camunda.png" width={16} height={16} />;
      case 'sst':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/sst.png" width={16} height={16} />;
      case 'serverless':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/serverless.png" width={16} height={16} />;
      case 'dynamodb':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/dynamodb.png" width={16} height={16} />;
      case 'nosql':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/nosql.png" width={16} height={16} />;
      case 'cloudformation':
      case 'aws cloudformation':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/cloudformation.png" width={16} height={16} />;
      case 'cicd':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/cicd.png" width={16} height={16} />;
      case 'sql':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/sql.png" width={16} height={16} />;
      case 'windows server':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/windows-server.png" width={16} height={16} />;
      case 'linux':
        return <StaticImage className="tech-icon" alt={tech} src="../../images/stack/linux.png" width={16} height={16} />;
      default:
        return null;
    }
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
                      {getTechIcon(tech)}
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
