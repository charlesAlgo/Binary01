import {
  Body, Container, Head, Heading, Hr, Html,
  Link, Preview, Section, Text,
} from "@react-email/components";

interface QuoteConfirmationEmailProps {
  name: string;
  service: string;
}

export default function QuoteConfirmationEmail({ name, service }: QuoteConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>We received your quote request — Charles will respond within 24 hours.</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>DataLife</Heading>
            <Text style={tagline}>AI &amp; Data Solutions</Text>
          </Section>

          {/* Body */}
          <Section style={content}>
            <Heading as="h2" style={h2}>Got your request, {name}.</Heading>

            <Text style={paragraph}>
              Thanks for reaching out. I&apos;ve received your quote request for{" "}
              <strong>{service}</strong> and will get back to you with a clear scope
              and fixed-price proposal within <strong>24 hours</strong>.
            </Text>

            <Text style={paragraph}>
              While you wait, feel free to browse case studies from similar projects:
            </Text>

            <Section style={ctaSection}>
              <Link href="https://data-life.tech/portfolio" style={ctaButton}>
                View Portfolio →
              </Link>
            </Section>

            <Hr style={hr} />

            <Text style={paragraph}>
              If you&apos;d prefer to talk through your project right away, you can
              book a free 30-minute discovery call:
            </Text>

            <Section style={ctaSection}>
              <Link href="https://data-life.tech/book" style={ctaButtonOutline}>
                Book a Discovery Call
              </Link>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Charles Shalua · Founder &amp; Co-Engineer, DataLife
            </Text>
            <Text style={footerText}>
              Ontario, Canada ·{" "}
              <Link href="mailto:hello@charlesshalua.com" style={footerLink}>
                hello@charlesshalua.com
              </Link>
            </Text>
            <Text style={footerMuted}>
              You received this because you submitted a quote request on data-life.tech.
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

/* ─── Styles ─────────────────────────────────────────────────────────────── */
const body = { backgroundColor: "#FAF7F2", fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", margin: 0 };
const container = { maxWidth: "560px", margin: "40px auto", backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" };
const header = { backgroundColor: "#183D30", padding: "32px 40px 24px" };
const logo = { color: "#ffffff", fontSize: "24px", fontWeight: 800, letterSpacing: "-0.04em", margin: 0 };
const tagline = { color: "rgba(255,255,255,0.55)", fontSize: "13px", margin: "4px 0 0" };
const content = { padding: "36px 40px 28px" };
const h2 = { color: "#111827", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 20px" };
const paragraph = { color: "#374151", fontSize: "15px", lineHeight: "1.7", margin: "0 0 16px" };
const ctaSection = { margin: "24px 0" };
const ctaButton = { display: "inline-block", backgroundColor: "#183D30", color: "#ffffff", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" };
const ctaButtonOutline = { display: "inline-block", backgroundColor: "transparent", color: "#183D30", padding: "11px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none", border: "2px solid #183D30" };
const hr = { borderColor: "#E5E7EB", margin: "28px 0" };
const footer = { backgroundColor: "#FAF7F2", padding: "24px 40px" };
const footerText = { color: "#6B7280", fontSize: "13px", margin: "0 0 4px", lineHeight: "1.6" };
const footerLink = { color: "#183D30", textDecoration: "none" };
const footerMuted = { color: "#9CA3AF", fontSize: "12px", margin: "12px 0 0" };
