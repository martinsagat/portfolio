import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { Icon } from '@components/icons';
import { usePrefersReducedMotion } from '@hooks';

const StyledBlogSection = styled.section`
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
  background: rgba(17, 34, 64, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 12px;
  padding: 40px;
  transition: var(--transition);
  z-index: 2;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    border-color: var(--blue);
    box-shadow: 0 10px 30px -10px rgba(2, 12, 27, 0.7);
  }

  @media (max-width: 768px) {
    padding: 25px;
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
      color: var(--blue);
      svg {
        width: 30px;
        height: 30px;
      }
    }

    .post-links {
      display: flex;
      align-items: center;
      gap: 10px;
      color: var(--light-slate);

      a {
        ${({ theme }) => theme.mixins.flexCenter};
        padding: 5px 7px;
        color: var(--light-slate);
        transition: var(--transition);
        position: relative;
        z-index: 2;

        &:hover,
        &:focus {
          color: var(--blue);
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
    color: var(--lightest-slate);
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

  .post-description {
    color: var(--light-slate);
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
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    margin-bottom: 10px;
  }

  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
    padding-top: 35px;
    border-top: 1px solid rgba(100, 255, 218, 0.1);
    list-style: none;
    padding: 0;
    margin: 35px 0 10px 0;

    @media (max-width: 768px) {
      margin: 30px 0 10px;
      padding-top: 30px;
    }

    li {
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      padding: 6px 12px;
      background: rgba(100, 255, 218, 0.1);
      border-radius: 4px;
      transition: var(--transition);
      white-space: nowrap;
      margin: 4px 0;

      &:hover {
        background: rgba(100, 255, 218, 0.2);
        transform: translateY(-1px);
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
