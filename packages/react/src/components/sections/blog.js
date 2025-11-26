import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledBlogSection = styled.section`
  width: 100%;
  background: var(--bg-primary);
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

  .blog-grid {
    ${({ theme }) => theme.mixins.resetList};
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: repeat(3, minmax(300px, 1fr));
    grid-gap: 20px;
    position: relative;
    z-index: 2;

    @media (max-width: 1080px) {
      grid-template-columns: repeat(2, minmax(300px, 1fr));
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      padding: 0 20px;
    }
  }
`;

const StyledBlogPost = styled.div`
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

  .post-inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .post-top {
    ${({ theme }) => theme.mixins.flexBetween};
    margin-bottom: 25px;
    width: 100%;

    .icon {
      color: var(--accent);
      svg {
        width: 30px;
        height: 30px;
      }
    }

    .post-links {
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

  .post-title {
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

  .post-description {
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

  .post-date {
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    margin-bottom: 10px;
  }

  .post-tags {
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

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      posts: allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/posts/" }
          frontmatter: { draft: { ne: true } }
        }
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 3
      ) {
        edges {
          node {
            frontmatter {
              title
              description
              date
              tags
              slug
            }
            html
          }
        }
      }
    }
  `);

  const revealTitle = useRef(null);
  const revealPosts = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealPosts.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const posts = data.posts.edges.filter(({ node }) => node);

  const postInner = node => {
    const { frontmatter, html } = node;
    const { title, description, date, tags, slug } = frontmatter;

    return (
      <div className="post-inner">
        <header>
          <div className="post-top">
            <div className="icon">
              <Icon name="Bookmark" />
            </div>
          </div>

          <h3 className="post-title">
            <a href={slug}>{title}</a>
          </h3>

          <div className="post-description" dangerouslySetInnerHTML={{ __html: html }} />
        </header>

        <footer>
          <div className="post-date">{new Date(date).toLocaleDateString()}</div>
          {tags && (
            <ul className="post-tags">
              {tags.map((tag, i) => (
                <li key={i}>{tag}</li>
              ))}
            </ul>
          )}
        </footer>
      </div>
    );
  };

  return (
    <StyledBlogSection id="blog">
      <h2 ref={revealTitle}>Latest Articles</h2>

      <ul className="blog-grid">
        {posts.map(({ node }, i) => (
          <StyledBlogPost key={i} ref={el => (revealPosts.current[i] = el)}>
            {postInner(node)}
          </StyledBlogPost>
        ))}
      </ul>
    </StyledBlogSection>
  );
};

export default Blog;
