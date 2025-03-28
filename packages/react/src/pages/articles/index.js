import React from 'react';
import { graphql, Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Layout } from '@components';
import { IconBookmark } from '@components/icons';

const StyledMainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 150px 0 100px;
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

  & > header {
    position: relative;
    z-index: 2;
    margin-bottom: 60px;
    text-align: center;
    padding: 0 40px;

    @media (max-width: 768px) {
      padding: 0 20px;
      margin-bottom: 40px;
    }

    h1 {
      color: var(--lightest-slate);
      font-size: clamp(32px, 5vw, 48px);
      margin-bottom: 15px;
      line-height: 1.2;
    }

    p {
      color: var(--light-slate);
      font-size: var(--fz-lg);
      max-width: 600px;
      margin: 0 auto;
    }
  }
`;

const StyledGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  margin: 0 auto;
  padding: 0 40px;
  max-width: 1000px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const StyledPost = styled.li`
  transition: var(--transition);
  cursor: default;

  @media (prefers-reduced-motion: no-preference) {
    &:hover,
    &:focus-within {
      .post__inner {
        transform: translateY(-7px);
      }
    }
  }

  a {
    position: relative;
    z-index: 1;
  }

  .post__inner {
    ${({ theme }) => theme.mixins.boxShadow};
    ${({ theme }) => theme.mixins.flexBetween};
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    height: 100%;
    padding: 2rem 1.75rem;
    border-radius: 12px;
    transition: var(--transition);
    background: rgba(17, 34, 64, 0.7);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(100, 255, 218, 0.1);

    &:hover {
      border-color: var(--blue);
      box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
    }

    header,
    a {
      width: 100%;
    }
  }

  .post__icon {
    ${({ theme }) => theme.mixins.flexBetween};
    color: var(--blue);
    margin-bottom: 25px;
    margin-left: -5px;

    svg {
      width: 35px;
      height: 35px;
    }
  }

  .post__title {
    margin: 0 0 12px;
    color: var(--lightest-slate);
    font-size: clamp(18px, 3vw, 22px);
    line-height: 1.3;

    a {
      position: static;
      text-decoration: none;
      color: inherit;
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

  .post__desc {
    color: var(--light-slate);
    font-size: var(--fz-md);
    line-height: 1.6;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .post__date {
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    margin-bottom: 12px;
  }

  ul.post__tags {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 6px;
    padding: 0;
    margin: 0;
    list-style: none;

    li {
      a {
        color: var(--light-slate);
        text-decoration: none;
        transition: var(--transition);
        padding: 3px 10px;
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
  }
`;

const ArticlesPage = ({ location, data }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location}>
      <Helmet title="Articles" />

      <StyledMainContainer>
        <header>
          <h1>Articles</h1>
          <p>Thoughts, tutorials, and insights about software development and technology.</p>
        </header>

        <StyledGrid>
          {posts.length > 0 &&
            posts.map(({ node }, i) => {
              const { frontmatter } = node;
              const { title, description, slug, date, tags } = frontmatter;
              const formattedDate = new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              });

              return (
                <StyledPost key={i}>
                  <div className="post__inner">
                    <header>
                      <div className="post__icon">
                        <IconBookmark />
                      </div>
                      <h5 className="post__title">
                        <Link to={slug}>{title}</Link>
                      </h5>
                      <p className="post__desc">{description}</p>
                    </header>

                    <footer>
                      <span className="post__date">{formattedDate}</span>
                      <ul className="post__tags">
                        {tags.map((tag, i) => (
                          <li key={i}>
                            <Link to={`/articles/tags/${kebabCase(tag)}/`}>
                              #{tag}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </footer>
                  </div>
                </StyledPost>
              );
            })}
        </StyledGrid>
      </StyledMainContainer>
    </Layout>
  );
};

ArticlesPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ArticlesPage;

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/content/posts/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            slug
            date
            tags
            draft
          }
          html
        }
      }
    }
  }
`;
