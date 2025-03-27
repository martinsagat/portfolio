import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { StaticImage } from 'gatsby-plugin-image';

const StyledHeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 100px 0;
  position: relative;
  background: var(--gradient-dark);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 0 50px;
    min-height: auto;
  }

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

  .inner {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 40px;
    width: 100%;

    @media (max-width: 768px) {
      padding: 0 20px;
    }
  }
`;

const StyledHeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 3rem;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  box-shadow: var(--glass-shadow);
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    background: transparent;
    backdrop-filter: none;
    border: none;
    box-shadow: none;
    padding: 1rem;
  }

  h1 {
    margin: 0 0 30px 4px;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-md), 5vw, var(--fz-xl));
    font-weight: 400;
    animation: fadeInUp 0.5s ease-out;
    letter-spacing: 2px;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h2 {
    margin: 0 0 20px;
    color: var(--lightest-slate);
    line-height: 1.1;
    font-size: clamp(40px, 8vw, 80px);
    font-weight: 600;
    text-align: center;
    animation: fadeInUp 0.5s ease-out 0.1s backwards;
    letter-spacing: -1px;

    @media (max-width: 768px) {
      font-size: clamp(35px, 7vw, 70px);
    }
  }

  h3 {
    margin: 0 0 20px;
    color: var(--lightest-slate);
    line-height: 1.1;
    font-size: clamp(24px, 4vw, 40px);
    font-weight: 600;
    text-align: center;
    animation: fadeInUp 0.5s ease-out 0.1s backwards;
    letter-spacing: -1px;

    @media (max-width: 768px) {
      font-size: clamp(20px, 3vw, 30px);
    }
  }

  p {
    margin: 0 auto;
    max-width: 800px;
    text-align: center;
    color: var(--slate);
    font-size: clamp(var(--fz-md), 2vw, var(--fz-lg));
    line-height: 1.8;
    animation: fadeInUp 0.5s ease-out 0.2s backwards;
    font-weight: 400;
    letter-spacing: 0.3px;
    padding: 0 20px;

    @media (max-width: 768px) {
      font-size: clamp(var(--fz-sm), 1.5vw, var(--fz-md));
      line-height: 1.6;
    }
  }

  .highlight {
    color: var(--blue);
    font-weight: 500;
  }

  a {
    color: var(--blue);
    text-decoration: none;
    transition: color var(--transition-normal) var(--easing);

    &:hover {
      color: var(--green);
    }
  }

  .cta-buttons {
    display: flex;
    gap: 20px;
    margin-top: 40px;
    justify-content: center;
    animation: fadeInUp 0.5s ease-out 0.3s backwards;

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
    background: var(--gradient-primary);
    border: none;
    color: var(--dark-navy);
    font-weight: 600;
    transition: all var(--transition-normal) var(--easing);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(11, 172, 235, 0.3);
    }

    &.secondary {
      background: transparent;
      border: 2px solid var(--blue);
      color: var(--blue);

      &:hover {
        background: var(--blue);
        color: var(--navy);
      }
    }
  }

  .chip {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    margin: 0 0.5rem;
    background: var(--gradient-primary);
    color: var(--dark-navy);
    border-radius: 20px;
    font-size: var(--fz-sm);
    font-weight: 600;
    font-family: var(--font-mono);
    vertical-align: middle;
    box-shadow: 0 2px 10px rgba(11, 172, 235, 0.2);
    transition: all var(--transition-normal) var(--easing);
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: var(--fz-xs);
      padding: 0.2rem 0.6rem;
      margin: 0 0.3rem;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(11, 172, 235, 0.3);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: bounce 2s infinite;

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
`;

const StyledTechnologies = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 2rem;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  box-shadow: var(--glass-shadow);
  max-width: 800px;
  margin: 2rem auto 0;
  animation: fadeInUp 0.5s ease-out 0.4s backwards;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 15px;
  }

  .tech-icon {
    width: 40px;
    height: 40px;
    padding: 8px;
    transition: all var(--transition-normal) var(--easing);
    opacity: 0.8;

    @media (max-width: 768px) {
      width: 30px;
      height: 30px;
      padding: 6px;
    }

    &:hover {
      transform: translateY(-3px);
      opacity: 1;
    }
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

  const one = (
    <h1>
      Hi, my name is
    </h1>
  );

  const two = (
    <h2>
      Martin Sagat
    </h2>
  );

  const three = (
    <h3>
      I build things for the web.
    </h3>
  );

  const four = (
    <p>
      I'm a <span className="chip">Senior Software Engineer</span> specializing in building scalable web and mobile applications.
      With expertise in cloud technologies and modern web frameworks, I create efficient, maintainable solutions that drive business growth.
    </p>
  );

  const five = (
    <StyledTechnologies>
      <StaticImage
        className="tech-icon"
        alt="html5"
        src="../../images/stack/html5.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="css3"
        src="../../images/stack/css3.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="js"
        src="../../images/stack/js.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="node"
        src="../../images/stack/node.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="react"
        src="../../images/stack/react.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="vue"
        src="../../images/stack/vue.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="graphql"
        src="../../images/stack/graphql.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="laravel"
        src="../../images/stack/laravel.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt=".net"
        src="../../images/stack/net.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="mysql"
        src="../../images/stack/mysql.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="postgresql"
        src="../../images/stack/postgresql.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="mongodb"
        src="../../images/stack/mongodb.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="aws"
        src="../../images/stack/aws.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="azure"
        src="../../images/stack/azure.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="terraform"
        src="../../images/stack/terraform.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="git"
        src="../../images/stack/git.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="linux"
        src="../../images/stack/linux.png"
        width={40}
        height={40}
      />
      <StaticImage
        className="tech-icon"
        alt="postman"
        src="../../images/stack/postman.svg"
        width={40}
        height={40}
      />
    </StyledTechnologies>
  );

  const items = [one, two, three, four];

  return (
    <StyledHeroSection>
      <StyledHeroContent>
        {prefersReducedMotion ? (
          <>
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
            {five}
          </>
        ) : (
          <>
            <TransitionGroup component={null}>
              {isMounted &&
                items.map((item, i) => (
                  <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                    <div style={{ transitionDelay: `${i * 100}ms` }}>{item}</div>
                  </CSSTransition>
                ))}
            </TransitionGroup>
            <TransitionGroup component={null}>
              {isMounted && (
                <CSSTransition classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${items.length * 100}ms` }}>{five}</div>
                </CSSTransition>
              )}
            </TransitionGroup>
          </>
        )}
      </StyledHeroContent>
    </StyledHeroSection>
  );
};

export default Hero;
