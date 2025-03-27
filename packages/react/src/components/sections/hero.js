import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { StaticImage } from 'gatsby-plugin-image';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  // align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--blue);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
    font-size: clamp(40px, 5vw, 60px);
    font-weight: 400;
    text-align: center;
  }

  p {
    margin: 60px 0 0;
    max-width: 540px;
    text-align: center;
    color: var(--slate);
    font-size: var(--fz-lg);
    line-height: 1.8;
  }

  .cta-buttons {
    display: flex;
    gap: 20px;
    margin-top: 60px;

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 300px;
      margin-left: auto;
      margin-right: auto;
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.5;
    padding: 1rem 2rem;

    &.secondary {
      background-color: transparent;
      border: 2px solid var(--blue);
      color: var(--blue);

      &:hover {
        background-color: var(--blue);
        color: var(--navy);
      }
    }
  }

  .technologies {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: center;
    padding: 10px;
    border-radius: 5px;
    margin-top: 50px;
    background-color: var(--light-navy);
    box-shadow: var(--shadow-md);
  }

  .tech-icon {
    width: 20px;
    padding: 15px;
    margin: 10px;
    transition: var(--transition);

    &:hover {
      transform: translateY(-3px);
    }
  }

  .chip {
    display: inline-block;
    padding: 0 10px;
    margin: 0 5px;
    background-color: var(--lightest-navy);
    color: var(--blue);
    border-radius: 20px;
    font-size: var(--fz-md);
    font-family: var(--font-mono);
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
    box-shadow: var(--shadow-sm);
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Martin Sagat</h2>;
  const three = (
    <>
      <p>
        I'm a<div className="chip">Senior Software Engineer</div> specializing in building scalable web and
        mobile applications. With expertise in cloud technologies and modern web frameworks, I create
        efficient, maintainable solutions that drive business growth.
      </p>
    </>
  );
  const four = (
    <div className="cta-buttons">
      <a
        className="email-link"
        href="https://www.linkedin.com/in/martinsagat"
        target="_blank"
        rel="noreferrer">
        Connect on LinkedIn
      </a>
      <a
        className="email-link secondary"
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer">
        View Resume
      </a>
    </div>
  );

  const five = (
    <div className="technologies">
      <StaticImage
        className="tech-icon"
        alt="html5"
        src="../../images/stack/html5.png"
        width={50}
      />
      <StaticImage className="tech-icon" alt="css3" src="../../images/stack/css3.png" width={50} />
      <StaticImage className="tech-icon" alt="js" src="../../images/stack/js.png" width={50} />
      <StaticImage className="tech-icon" alt="node" src="../../images/stack/node.png" />
      <StaticImage className="tech-icon" alt="react" src="../../images/stack/react.png" width={50} />
      <StaticImage className="tech-icon" alt="vue" src="../../images/stack/vue.png" />
      <StaticImage className="tech-icon" alt="graphql" src="../../images/stack/graphql.png" width={50} />
      <StaticImage className="tech-icon" alt="laravel" src="../../images/stack/laravel.png" />
      <StaticImage className="tech-icon" alt=".net" src="../../images/stack/net.png" />
      <StaticImage className="tech-icon" alt="mysql" src="../../images/stack/mysql.png" width={50} />
      <StaticImage className="tech-icon" alt="postgresql" src="../../images/stack/postgresql.png" width={50} />
      <StaticImage className="tech-icon" alt="mongodb" src="../../images/stack/mongodb.png" width={50} />
      <StaticImage className="tech-icon" alt="aws" src="../../images/stack/aws.png" width={50} />
      <StaticImage className="tech-icon" alt="azure" src="../../images/stack/azure.png" width={50} />
      <StaticImage className="tech-icon" alt="terraform" src="../../images/stack/terraform.png" width={50} />
      <StaticImage className="tech-icon" alt="git" src="../../images/stack/git.png" width={50} />
      <StaticImage className="tech-icon" alt="linux" src="../../images/stack/linux.png" width={50} />
      <StaticImage className="tech-icon" alt="postman" src="../../images/stack/postman.svg" width={50} />
    </div>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection className="styledHeroSection">
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
