export function About() {
  return (
    <section id="about" className="px-6 pt-8 pb-8 text-center sm:px-12">
      <h2 className="text-3xl font-medium tracking-[-0.03em]">About Me</h2>
      <div className="mx-auto mt-6 max-w-[40rem] space-y-6 text-[1.0625rem] leading-8 text-muted">
        <p>
          I&apos;m based in Perth and work as a Frontend Engineer at HBF Health. Most of
          what I build is in TypeScript: web apps, mobile apps, and the AWS services
          behind them. Before HBF I was the sole engineer at PS Rewards, where I
          designed, shipped, and operated the platform end to end.
        </p>
        <p>
          I care about interfaces that feel obvious, and about code that stays easy
          to change after it ships. I use AI tools through the work for design, review,
          tests, and debugging. I still read everything that goes out.
        </p>
      </div>
    </section>
  );
}
