import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const StyledHeroSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 100px 0;
  position: relative;
  background: var(--bg-primary);
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 0 40px;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 60px 0 30px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 50%, var(--bg-secondary) 0%, transparent 50%);
    opacity: 0.3;
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
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: center;
  justify-content: center;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: left;
    gap: 4rem;
    margin: 0 auto;
    padding: 3rem 4rem;
    width: 100%;
    max-width: 1200px;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
    gap: 2.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    gap: 2rem;
  }

  .hero-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
    width: 100%;
    max-width: 600px;
    gap: 1.5rem;

    @media (max-width: 1023px) {
      align-items: center;
      text-align: center;
      max-width: 100%;
      gap: 1.25rem;
    }

    @media (max-width: 480px) {
      gap: 1rem;
    }
  }

  .hero-right {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;

    @media (max-width: 1023px) {
      order: 3;
      max-width: 100%;
      width: 100%;
    }
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--accent);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-md), 5vw, var(--fz-xl));
    font-weight: 500;
    letter-spacing: 1px;

    @media (max-width: 1023px) {
      margin: 0 0 20px 0;
      text-align: center;
    }

    @media (max-width: 480px) {
      margin: 0 0 16px 0;
      font-size: var(--fz-sm);
    }
  }

  h2 {
    margin: 0 0 20px;
    color: var(--text-primary);
    line-height: 1.1;
    font-size: clamp(40px, 8vw, 80px);
    font-weight: 700;
    text-align: left;
    letter-spacing: -0.03em;
    position: relative;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    @media (max-width: 1023px) {
      text-align: center;
      margin: 0 0 16px;
    }

    @media (max-width: 768px) {
      font-size: clamp(40px, 8vw, 60px);
      margin: 0 0 12px;
    }

    @media (max-width: 480px) {
      font-size: clamp(32px, 8vw, 48px);
      margin: 0 0 10px;
    }

    &::before {
      content: 'Martin Sagat';
      position: absolute;
      left: 0;
      right: 0;
      color: var(--accent);
      opacity: 0;
      transform: translateY(5px);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
      transform: translateY(-1px) scale(1.01);

      &::before {
        opacity: 0.6;
        transform: translateY(0);
      }
    }
  }

  h3 {
    margin: 0 0 20px;
    color: var(--text-primary);
    line-height: 1.1;
    font-size: clamp(24px, 4vw, 40px);
    font-weight: 600;
    text-align: left;
    letter-spacing: -0.02em;

    @media (max-width: 1023px) {
      text-align: center;
      margin: 0 0 16px;
    }

    @media (max-width: 768px) {
      font-size: clamp(20px, 4vw, 28px);
      margin: 0 0 12px;
    }

    @media (max-width: 480px) {
      font-size: clamp(18px, 4vw, 24px);
      margin: 0 0 10px;
    }
  }

  p {
    margin: 0;
    max-width: 100%;
    text-align: left;
    color: var(--text-secondary);
    font-size: clamp(var(--fz-md), 2vw, var(--fz-lg));
    line-height: 1.8;
    font-weight: 400;
    letter-spacing: 0.01em;
    padding: 0;

    @media (max-width: 1023px) {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
    }

    @media (max-width: 768px) {
      font-size: clamp(var(--fz-sm), 1.5vw, var(--fz-md));
      line-height: 1.6;
    }
  }

  .highlight {
    color: var(--accent);
    font-weight: 500;
  }

  a {
    color: var(--accent);
    text-decoration: none;
    transition: color var(--transition-normal) var(--easing);

    &:hover {
      color: var(--accent-hover);
    }
  }

  .cta-buttons {
    display: flex;
    gap: 20px;
    margin-top: 40px;
    justify-content: flex-start;

    @media (max-width: 1023px) {
      justify-content: center;
      margin-top: 32px;
      gap: 16px;
    }

    @media (max-width: 480px) {
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 300px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 24px;
      gap: 12px;
    }
  }

  .email-link {
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.5;
    padding: 1rem 2rem;
    background: var(--accent);
    border: none;
    color: var(--text-light);
    font-weight: 600;
    transition: all var(--transition-normal) var(--easing);
    border-radius: 999px;

    &:hover {
      background: var(--accent-hover);
      color: var(--text-light);
    }

    &.secondary {
      background: transparent;
      border: 2px solid var(--accent);
      color: var(--accent);

      &:hover {
        background: var(--accent);
        color: var(--text-light);
        border-color: var(--accent);
      }
    }
  }

  .chip {
    display: inline-block;
    padding: 0.25rem 0.75rem;
    margin: 0 0.5rem;
    background: var(--accent-light);
    color: var(--accent);
    border-radius: 12px;
    font-size: var(--fz-sm);
    font-weight: 500;
    font-family: var(--font-mono);
    vertical-align: middle;
    transition: all var(--transition-normal) var(--easing);
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: var(--fz-xs);
      padding: 0.2rem 0.6rem;
      margin: 0 0.3rem;
    }
  }
`;

const StyledScrollIndicator = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    bottom: 20px;
  }
`;

const StyledTechnologies = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;

  @media (min-width: 1024px) {
    min-height: 500px;
  }

  @media (max-width: 768px) {
    min-height: 350px;
  }

  @media (max-width: 480px) {
    min-height: 300px;
  }

  .tech-icon {
    position: absolute;
    padding: 8px;
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    border-radius: 50%;
    background: var(--bg-secondary);
    border: 2px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04);
    opacity: 0;
    animation: fadeInUp 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    z-index: 1;

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    /* GatsbyImage creates a div wrapper */
    > div {
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      margin: 0 !important;
    }

    /* Gatsby Image wrapper */
    .gatsby-image-wrapper {
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      margin: 0 !important;
    }

    /* Picture element */
    picture {
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }

    /* Actual image */
    img {
      width: 100% !important;
      height: 100% !important;
      object-fit: contain !important;
      object-position: center !important;
      filter: grayscale(20%) brightness(0.92);
      transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      display: block !important;
    }

    &:hover {
      border-color: var(--accent);
      background: linear-gradient(135deg, var(--accent-light) 0%, rgba(100, 255, 218, 0.15) 100%);
      box-shadow: 0 12px 32px rgba(100, 255, 218, 0.25), 0 4px 16px rgba(100, 255, 218, 0.15);
      transform: translateY(-8px) scale(1.1) rotate(2deg);
      z-index: 10;

      img {
        filter: grayscale(0%) brightness(1.15);
      }
    }

    @media (max-width: 768px) {
      padding: 6px;
      border-radius: 50%;
      transform: scale(0.85);

      &:hover {
        transform: translateY(-6px) scale(0.95) rotate(2deg);
      }
    }

    @media (max-width: 480px) {
      padding: 5px;
      border-radius: 50%;
      transform: scale(0.75);

      &:hover {
        transform: translateY(-4px) scale(0.85) rotate(2deg);
      }
    }
  }
`;

const StyledActionButtons = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  margin: 2rem 0 1rem;

  @media (max-width: 1023px) {
    justify-content: center;
    margin: 1.5rem 0 0.5rem;
    gap: 16px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
    margin: 1.25rem 0 0.5rem;
    gap: 12px;
  }
`;

const StyledButton = styled.a`
  ${({ theme }) => theme.mixins.bigButton};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.4;
  padding: 1rem 2rem;
  background: transparent !important;
  border: 2px solid var(--accent) !important;
  color: var(--accent) !important;
  font-weight: 600;
  width: 300px;
  font-size: var(--fz-md);
  letter-spacing: 0.3px;
  transition: all var(--transition-normal) var(--easing);
  text-decoration: none;
  border-radius: 999px;
  box-shadow: none !important;
  transform: none !important;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 240px;
    padding: 0.7rem 1.5rem;
    font-size: var(--fz-sm);
    line-height: 1.3;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    padding: 0.625rem 1.25rem;
    font-size: var(--fz-xs);
    letter-spacing: 0.1px;
    line-height: 1.3;
    border-width: 1.5px;
  }

  &:hover {
    background: var(--accent) !important;
    color: var(--text-light) !important;
    border-color: var(--accent) !important;
    box-shadow: none !important;
    transform: none !important;
  }
`;

const Hero = () => {
  // Query stack images
  const data = useStaticQuery(graphql`
    query HeroTechIcons {
      techIcons: allFile(
        filter: {
          relativeDirectory: { eq: "stack" }
          sourceInstanceName: { eq: "images" }
        }
      ) {
        edges {
          node {
            relativePath
            name
            extension
            childImageSharp {
              gatsbyImageData(
                width: 200
                formats: [AUTO, WEBP, AVIF]
                quality: 100
                placeholder: BLURRED
                layout: CONSTRAINED
              )
            }
            publicURL
          }
        }
      }
    }
  `);

  // Create a map of image names to their gatsbyImageData or publicURL
  const techIconsMap = data.techIcons.edges.reduce((acc, { node }) => {
    if (node.childImageSharp) {
      acc[node.name] = node.childImageSharp.gatsbyImageData;
    } else if (node.extension === 'svg' && node.publicURL) {
      // For SVG files that don't go through ImageSharp
      acc[node.name] = { publicURL: node.publicURL, isSvg: true };
    }
    return acc;
  }, {});

  // Debug: Log available images (remove in production)
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('Hero - Available tech icons:', Object.keys(techIconsMap));
    console.log('Hero - Total icons found:', data.techIcons.edges.length);
    console.log('Hero - Tech icons map:', techIconsMap);
  }

  // Technology stack data - filter to only include techs that have images available
  const technologies = useMemo(() => {
    const techs = [
      { name: 'html5' },
      { name: 'css3' },
      { name: 'js' },
      { name: 'node' },
      { name: 'react' },
      // { name: 'vue' }, // File doesn't exist
      { name: 'graphql' },
      { name: 'laravel' },
      { name: 'net' }, // Note: file is 'net.png', not '.net'
      { name: 'mysql' },
      { name: 'postgresql' },
      { name: 'mongodb' },
      { name: 'aws' },
      { name: 'azure' },
      { name: 'terraform' },
      { name: 'git' },
      { name: 'linux' },
      { name: 'postman' },
    ];

    // Filter to only include techs that have images available
    const availableTechs = techs.filter(tech => techIconsMap[tech.name]);

    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.log('Hero - Technologies available:', availableTechs.length, 'out of', techs.length);
      console.log('Hero - Missing images:', techs.filter(tech => !techIconsMap[tech.name]).map(t => t.name));
    }

    // Generate random sizes and positions for honeycomb layout
    const colsPerRow = 4; // Number of columns in each row (reduced from 5 for narrower cluster)
    const hexWidth = 90; // Base width for hexagon spacing (slightly reduced)
    const hexHeight = 95; // Base height for hexagon spacing (increased for taller cluster)

    return availableTechs.map((tech, index) => {
      // Random size between 55px and 85px for elegant variation
      const baseSize = 55 + Math.random() * 30;
      const size = Math.round(baseSize);

      // Honeycomb positioning - more refined pattern
      const row = Math.floor(index / colsPerRow);
      const col = index % colsPerRow;

      // Hexagonal offset: every other row is offset by half a hexagon
      const hexOffset = row % 2 === 1 ? 0.5 : 0;

      // Calculate position with honeycomb offset and slight randomness for organic feel
      const randomX = (Math.random() - 0.5) * 10;
      const randomY = (Math.random() - 0.5) * 12;
      const left = 15 + (col + hexOffset) * hexWidth + randomX;
      const top = 15 + row * hexHeight * 0.92 + randomY;

      return {
        ...tech,
        size,
        left: `${left}px`,
        top: `${top}px`,
        animationDelay: `${index * 0.05}s`,
      };
    });
  }, [techIconsMap]);

  const one = <h1>Hi, my name is</h1>;

  const two = <h2>Martin Sagat</h2>;

  const three = <h3>I build things for the web.</h3>;

  const four = (
    <p>
      I'm a <span className="chip">Senior Software Engineer</span> specializing in building scalable
      web and mobile applications. With expertise in cloud technologies and modern web frameworks, I
      create efficient, maintainable solutions that drive business growth.
    </p>
  );

  const actionButtons = (
    <StyledActionButtons>
      <StyledButton
        href="https://www.linkedin.com/in/martinsagat/"
        target="_blank"
        rel="noreferrer">
        Connect on LinkedIn
      </StyledButton>
      <StyledButton href="/resume.pdf" target="_blank" rel="noreferrer">
        View Resume
      </StyledButton>
    </StyledActionButtons>
  );

  const five = (
    <StyledTechnologies>
      {technologies.length === 0 && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'var(--text-secondary)',
          fontSize: 'var(--fz-sm)'
        }}>
          Loading icons...
        </div>
      )}
      {technologies.map((tech, index) => {
        const imageSize = Math.max(64, tech.size - 16);
        const imageData = techIconsMap[tech.name];

        if (!imageData) {
          if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
            console.warn(`Hero - Image not found for: ${tech.name}`);
          }
          return null; // Skip if image not found
        }

        return (
          <div
            key={tech.name}
            className="tech-icon"
            style={{
              width: `${tech.size}px`,
              height: `${tech.size}px`,
              left: tech.left,
              top: tech.top,
              animationDelay: tech.animationDelay,
            }}>
            {imageData.isSvg ? (
              <img
                src={imageData.publicURL}
                alt={tech.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
            ) : (
              <GatsbyImage
                image={imageData}
                alt={tech.name}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                imgStyle={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
            )}
          </div>
        );
      })}
    </StyledTechnologies>
  );

  return (
    <StyledHeroSection>
      <StyledHeroContent>
        <div className="hero-left">
          {one}
          {two}
          {three}
          {four}
          {actionButtons}
        </div>
        <div className="hero-right">
          {five}
        </div>
      </StyledHeroContent>
      <StyledScrollIndicator>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </StyledScrollIndicator>
    </StyledHeroSection>
  );
};

export default Hero;
