import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';

const StyledPostContainer = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 100px 0;
  position: relative;
  background: var(--gradient-dark);
  min-height: 100vh;

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
`;

const StyledPostWrapper = styled.div`
  position: relative;
  z-index: 2;
  padding: 0 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const StyledBreadcrumb = styled.span`
  display: inline-flex;
  align-items: center;
  margin-bottom: 40px;
  color: var(--light-slate);
  font-family: var(--font-mono);
  font-size: var(--fz-sm);

  .arrow {
    margin-right: 10px;
    transition: var(--transition);
  }

  a {
    color: var(--light-slate);
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      color: var(--blue);
    }
  }

  &:hover .arrow {
    transform: translateX(-5px);
  }
`;

const StyledPostHeader = styled.header`
  margin-bottom: 60px;
  text-align: center;

  h1 {
    color: var(--lightest-slate);
    font-size: clamp(32px, 5vw, 48px);
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .subtitle {
    color: var(--light-slate);
    font-size: var(--fz-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;

    time {
      color: var(--blue);
      font-family: var(--font-mono);
    }

    .tag {
      color: var(--light-slate);
      text-decoration: none;
      transition: var(--transition);
      padding: 4px 12px;
      background: rgba(100, 255, 218, 0.1);
      border-radius: 4px;
      font-size: var(--fz-sm);
      font-family: var(--font-mono);

      &:hover {
        color: var(--blue);
        background: rgba(100, 255, 218, 0.2);
        transform: translateY(-1px);
      }
    }
  }
`;

const StyledPostContent = styled.div`
  background: rgba(17, 34, 64, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 12px;
  padding: 40px;
  margin-bottom: 100px;
  color: var(--light-slate);
  font-size: var(--fz-lg);
  line-height: 1.8;

  @media (max-width: 768px) {
    padding: 25px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lightest-slate);
    margin: 2em 0 1em;
    line-height: 1.3;
  }

  h2 {
    font-size: clamp(24px, 4vw, 32px);
  }

  h3 {
    font-size: clamp(20px, 3vw, 24px);
  }

  p {
    margin: 1.5em 0;
    line-height: 1.8;
  }

  a {
    ${({ theme }) => theme.mixins.inlineLink};
    color: var(--blue);
    text-decoration: none;
    transition: var(--transition);

    &:hover {
      color: var(--lightest-slate);
    }
  }

  code {
    background-color: var(--lightest-navy);
    color: var(--lightest-slate);
    border-radius: var(--border-radius);
    font-size: var(--fz-sm);
    padding: 0.2em 0.4em;
    font-family: var(--font-mono);
  }

  pre {
    background-color: var(--lightest-navy);
    border-radius: var(--border-radius);
    padding: 20px;
    margin: 2em 0;
    overflow-x: auto;

    code {
      background-color: transparent;
      padding: 0;
      font-size: var(--fz-sm);
    }
  }

  blockquote {
    border-left: 4px solid var(--blue);
    padding-left: 20px;
    margin: 2em 0;
    font-style: italic;
    color: var(--light-slate);
  }

  ul, ol {
    margin: 1.5em 0;
    padding-left: 2em;

    li {
      margin: 0.5em 0;
    }
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: var(--border-radius);
    margin: 2em 0;
  }

  hr {
    border: none;
    border-top: 1px solid rgba(100, 255, 218, 0.1);
    margin: 3em 0;
  }
`;

const PostTemplate = ({ data, location }) => {
  const { frontmatter, html } = data.markdownRemark;
  const { title, date, tags } = frontmatter;

  return (
    <Layout location={location}>
      <Helmet title={title} />

      <StyledPostContainer>
        <StyledPostWrapper>
          <StyledBreadcrumb>
            <span className="arrow">&larr;</span>
            <Link to="/articles">All Articles</Link>
          </StyledBreadcrumb>

          <StyledPostHeader>
            <h1>{title}</h1>
            <p className="subtitle">
              <time>
                {new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              {tags && tags.length > 0 && <span>&nbsp;&mdash;&nbsp;</span>}
              {tags &&
                tags.length > 0 &&
                tags.map((tag, i) => (
                  <Link key={i} to={`/articles/tags/${kebabCase(tag)}/`} className="tag">
                    #{tag}
                  </Link>
                ))}
            </p>
          </StyledPostHeader>

          <StyledPostContent dangerouslySetInnerHTML={{ __html: html }} />
        </StyledPostWrapper>
      </StyledPostContainer>
    </Layout>
  );
};

export default PostTemplate;

PostTemplate.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
};

export const pageQuery = graphql`
  query ($path: String!) {
    markdownRemark(frontmatter: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        description
        date
        slug
        tags
      }
    }
  }
`;
