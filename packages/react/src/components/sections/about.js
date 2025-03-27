import React, { useEffect, useRef } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledAboutSection = styled.section`
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
    padding: 0 40px;
    text-align: left;
    position: relative;
    z-index: 2;

    @media (max-width: 768px) {
      padding: 0 20px;
    }
  }

  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 80px;
    align-items: center;
    position: relative;
    z-index: 2;
    justify-items: center;

    @media (max-width: 768px) {
      display: block;
      text-align: center;
      grid-gap: 40px;
      padding: 0 20px;
    }
  }
`;
const StyledText = styled.div`
  text-align: left;
  width: 100%;
  max-width: 600px;
  margin: 0;
  padding: 0;

  p {
    font-size: var(--fz-lg);
    line-height: 1.8;
    color: var(--light-slate);
    margin-bottom: 1.5rem;
    text-align: left;
    padding: 0;

    @media (max-width: 768px) {
      font-size: var(--fz-md);
      line-height: 1.6;
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

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--blue);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
  }
`;
const StyledPic = styled.div`
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 0;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: var(--blue);

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(50%) contrast(1);
      transition: var(--transition);
      transform: translateZ(0);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--blue);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

const About = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">About Me</h2>

      <div className="inner">
        <StyledText>
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
      </div>
    </StyledAboutSection>
  );
};

export default About;
