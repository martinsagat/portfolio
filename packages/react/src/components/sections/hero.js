import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { StaticImage } from 'gatsby-plugin-image';
import Background3D from '@components/Background3D';

const StyledHeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 100px 0;
  position: relative;
  background: var(--gradient-dark);
  overflow: hidden;
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
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

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

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
  background: rgba(17, 34, 64, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: var(--border-radius);
  box-shadow: var(--glass-shadow);
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    background: rgba(17, 34, 64, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
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
    animation: slideInLeft 0.8s ease-out;
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
    animation: slideInRight 0.8s ease-out 0.2s backwards;
    letter-spacing: -1px;
    position: relative;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    @media (max-width: 768px) {
      font-size: clamp(35px, 7vw, 70px);
    }

    &::before {
      content: 'Martin Sagat';
      position: absolute;
      left: 0;
      right: 0;
      background: linear-gradient(120deg, var(--blue) 0%, var(--green) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0;
      transform: translateY(5px);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      transform: translateY(-1px);
      text-shadow: 0 2px 8px rgba(100, 255, 218, 0.2);

      &::before {
        opacity: 0.8;
        transform: translateY(0);
      }
    }
  }

  h3 {
    margin: 0 0 20px;
    color: var(--lightest-slate);
    line-height: 1.1;
    font-size: clamp(24px, 4vw, 40px);
    font-weight: 600;
    text-align: center;
    animation: slideInLeft 0.8s ease-out 0.4s backwards;
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
    animation: slideInRight 0.8s ease-out 0.6s backwards;
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
    animation: slideInLeft 0.8s ease-out 0.8s backwards;

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
  background: rgba(17, 34, 64, 0.7);
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
    width: 48px;
    height: 48px;
    padding: 8px;
    transition: all var(--transition-normal) var(--easing);
    opacity: 0.9;
    border-radius: 8px;
    filter: brightness(1.2);

    @media (max-width: 768px) {
      width: 40px;
      height: 40px;
      padding: 6px;
    }

    &:hover {
      transform: translateY(-3px);
      opacity: 1;
      filter: brightness(1.4);
    }
  }
`;

const StyledActionButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 4rem 0 2rem;
  animation: fadeInUp 0.5s ease-out 0.3s backwards;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledButton = styled.a`
  ${({ theme }) => theme.mixins.bigButton};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.5;
  padding: 1rem 2rem;
  background: transparent;
  border: 2px solid var(--blue);
  color: var(--blue);
  font-weight: 700;
  font-size: var(--fz-md);
  letter-spacing: 0.5px;
  transition: all var(--transition-normal) var(--easing);
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    background: var(--dark-navy);
    color: var(--green);
    box-shadow: 0 5px 15px rgba(11, 172, 235, 0.4);
    border-color: var(--green);
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

  const actionButtons = (
    <StyledActionButtons>
      <StyledButton href="https://www.linkedin.com/in/martinsagat/" target="_blank" rel="noreferrer">
        Connect on LinkedIn
      </StyledButton>
      <StyledButton href="/resume.pdf" target="_blank" rel="noreferrer">
        View Resume
      </StyledButton>
    </StyledActionButtons>
  );

  const five = (
    <StyledTechnologies>
      <StaticImage
        className="tech-icon"
        alt="html5"
        src="../../images/stack/html5.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="css3"
        src="../../images/stack/css3.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="js"
        src="../../images/stack/js.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="node"
        src="../../images/stack/node.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="react"
        src="../../images/stack/react.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="vue"
        src="../../images/stack/vue.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="graphql"
        src="../../images/stack/graphql.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="laravel"
        src="../../images/stack/laravel.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt=".net"
        src="../../images/stack/net.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="mysql"
        src="../../images/stack/mysql.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="postgresql"
        src="../../images/stack/postgresql.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="mongodb"
        src="../../images/stack/mongodb.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="aws"
        src="../../images/stack/aws.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="azure"
        src="../../images/stack/azure.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="terraform"
        src="../../images/stack/terraform.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="git"
        src="../../images/stack/git.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="linux"
        src="../../images/stack/linux.png"
        width={48}
        height={48}
        objectFit="contain"
      />
      <StaticImage
        className="tech-icon"
        alt="postman"
        src="../../images/stack/postman.svg"
        width={48}
        height={48}
        objectFit="contain"
      />
    </StyledTechnologies>
  );

  const items = [one, two, three, four, actionButtons, five];

  return (
    <StyledHeroSection>
      <StyledHeroContent>
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
                  <div style={{ transitionDelay: `${i * 100}ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </StyledHeroContent>
    </StyledHeroSection>
  );
};

export default Hero;
