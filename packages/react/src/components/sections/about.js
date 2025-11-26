import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const StyledAboutSection = styled.section`
  width: 100%;
  background: var(--bg-primary);
  padding: 100px 0;
  position: relative;
  overflow: hidden;

  .numbered-heading {
    margin: 0 0 1.5rem 0;
    padding: 0;
    text-align: left;
    position: relative;
    z-index: 2;
    color: var(--text-primary);
    font-size: clamp(24px, 5vw, 32px);
    font-weight: 600;

    @media (max-width: 768px) {
      text-align: center;
      margin: 0 0 1.25rem 0;
    }
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 80px;
    align-items: center;
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      text-align: center;
      grid-gap: 50px;
      padding: 0 20px;
    }
  }
`;
const StyledText = styled.div`
  text-align: left;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    text-align: center;
  }

  p {
    font-size: var(--fz-lg);
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
    text-align: left;
    padding: 0;
    margin-top: 0;

    b {
      color: var(--text-primary);
      font-weight: 600;
    }

    @media (max-width: 768px) {
      font-size: var(--fz-md);
      line-height: 1.6;
      text-align: center;
    }
  }

  ul.skills-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(140px, 200px));
    grid-gap: 0 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;
    text-align: left;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--text-secondary);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--accent);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  margin: 0;
  flex-shrink: 0;

  @media (max-width: 768px) {
    margin: 0 auto 50px;
    width: 200px;
    height: 200px;
  }

  @media (max-width: 480px) {
    width: 180px;
    height: 180px;
  }

  .wrapper {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--bg-secondary);
    border: 3px solid var(--border);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
    transition: all var(--transition-normal) var(--easing);

    &:hover,
    &:focus {
      outline: 0;
      border-color: var(--accent);
      box-shadow: 0 8px 24px rgba(37, 99, 235, 0.2);
      transform: scale(1.02);

      .img {
        filter: grayscale(0%);
      }
    }

    .img {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      filter: grayscale(20%);
      transition: filter var(--transition-normal) var(--easing);
      transform: translateZ(0);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
  }
`;

const About = () => {
  return (
    <StyledAboutSection id="about">
      <div className="inner">
        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.jpg"
              width={800}
              height={800}
              quality={100}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
              placeholder="blurred"
              layout="constrained"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        </StyledPic>

        <StyledText>
          <h2 className="numbered-heading">About Me</h2>
          <div>
            <p>
              As a skilled Software Engineer with a diverse experience in the Logistics, Marketing,
              and Healthcare industries, I am eager to continuously deliver impactful solutions and
              drive innovations. I'm highly adaptable, experimental and persistent in my approach to
              problem-solving. I always strive to find the meaning to my work by exploring the{' '}
              <b>
                <i>why</i>
              </b>{' '}
              behind the{' '}
              <b>
                <i>what</i>
              </b>{' '}
              and{' '}
              <b>
                <i>how</i>
              </b>
              .
            </p>
          </div>
        </StyledText>
      </div>
    </StyledAboutSection>
  );
};

export default About;
