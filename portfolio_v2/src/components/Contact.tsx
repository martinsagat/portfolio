export function Contact() {
  return (
    <section id="contact" className="px-6 pt-8 pb-24 text-center sm:px-12">
      <h2 className="text-3xl font-medium tracking-[-0.03em]">Get In Touch</h2>
      <p className="mx-auto mt-6 max-w-[34rem] text-[1.0625rem] leading-8 text-muted">
        I&apos;m at HBF Health, and I&apos;m open to a conversation. A question or a
        hello is welcome.
      </p>
      <a
        href="mailto:martin.sagat@outlook.com.au"
        className="mt-8 inline-flex min-h-11 items-center rounded-md bg-accent px-5 py-3 text-sm font-medium tracking-[-0.01em] text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Say Hello
      </a>
    </section>
  );
}
