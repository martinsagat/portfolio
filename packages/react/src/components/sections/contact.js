import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig, email } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledContactSection = styled.section`
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

  .overline {
    display: block;
    margin-bottom: 20px;
    color: var(--blue);
    font-family: var(--font-mono);
    font-size: var(--fz-md);
    font-weight: 400;
    text-align: center;
    position: relative;
    z-index: 2;

    &:before {
      bottom: 0;
      font-size: var(--fz-sm);
    }

    &:after {
      display: none;
    }
  }

  .title {
    font-size: clamp(40px, 5vw, 60px);
    text-align: center;
    position: relative;
    z-index: 2;
    margin-bottom: 20px;
  }

  p {
    max-width: 600px;
    margin: 0 auto 50px;
    text-align: center;
    position: relative;
    z-index: 2;
    font-size: var(--fz-lg);
    line-height: 1.8;
    color: var(--light-slate);
    padding: 0 40px;

    @media (max-width: 768px) {
      padding: 0 20px;
      font-size: var(--fz-md);
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin: 50px auto 0;
    display: block;
    width: fit-content;
    position: relative;
    z-index: 2;
  }
`;

const Contact = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledContactSection id="contact" ref={revealContainer}>
      <h2 className="numbered-heading overline">What's Next?</h2>

      <h2 className="title">Get In Touch</h2>

      <p>
        Whether you have a question or want to connect, feel free to reach out, and I'll do my best
        to respond promptly!
      </p>

      <a className="email-link" href={`mailto:${email}`}>
        Say Hello 👋
      </a>
    </StyledContactSection>
  );
};

export default Contact;
