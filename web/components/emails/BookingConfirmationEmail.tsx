import {
  Body, Container, Head, Heading, Hr, Html,
  Link, Preview, Section, Text,
} from "@react-email/components";
import type { CalcomPayload } from "@/types/calcom";

interface BookingConfirmationEmailProps {
  payload: CalcomPayload;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-US", {
      weekday: "long", year: "numeric", month: "long",
      day: "numeric", hour: "2-digit", minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return iso;
  }
}

export default function BookingConfirmationEmail({ payload }: BookingConfirmationEmailProps) {
  const attendee = payload.attendees?.[0];
  const name = attendee?.name ?? "there";

  return (
    <Html>
      <Head />
      <Preview>Your discovery call with Charles is confirmed — see you soon!</Preview>
      <Body style={body}>
        <Container style={container}>

          {/* Header */}
          <Section style={header}>
            <Heading style={logo}>DataLife</Heading>
            <Text style={tagline}>AI &amp; Data Solutions</Text>
          </Section>

          {/* Body */}
          <Section style={content}>
            <Heading as="h2" style={h2}>You&apos;re booked, {name}!</Heading>

            <Text style={paragraph}>
              Your free 30-minute discovery call with Charles Shalua is confirmed.
              Here are the details:
            </Text>

            {/* Booking details card */}
            <Section style={detailsCard}>
              <Text style={detailRow}>
                <strong>Event:</strong> {payload.title}
              </Text>
              <Text style={detailRow}>
                <strong>Start:</strong> {formatDate(payload.startTime)}
              </Text>
              <Text style={detailRow}>
                <strong>End:</strong> {formatDate(payload.endTime)}
              </Text>
            </Section>

            <Text style={paragraph}>
              A calendar invite with the video link has been sent to your email.
              If you need to reschedule, use the link in that invite.
            </Text>

            <Hr style={hr} />

            <Text style={paragraph}>
              <strong>How to prepare:</strong> Come with a description of your
              problem, your current tools, and a rough idea of timeline. You
              don&apos;t need a full spec — just a goal.
            </Text>

            <Section style={ctaSection}>
              <Link href="https://datalife.dev/portfolio" style={ctaButton}>
                Browse Case Studies Before the Call →
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
              You received this because you booked a call at datalife.dev/book.
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
const detailsCard = { backgroundColor: "#F0FDF4", borderRadius: "10px", padding: "16px 20px", margin: "0 0 20px" };
const detailRow = { color: "#1F2937", fontSize: "14px", lineHeight: "1.8", margin: "0 0 4px" };
const ctaSection = { margin: "24px 0" };
const ctaButton = { display: "inline-block", backgroundColor: "#183D30", color: "#ffffff", padding: "12px 24px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" };
const hr = { borderColor: "#E5E7EB", margin: "28px 0" };
const footer = { backgroundColor: "#FAF7F2", padding: "24px 40px" };
const footerText = { color: "#6B7280", fontSize: "13px", margin: "0 0 4px", lineHeight: "1.6" };
const footerLink = { color: "#183D30", textDecoration: "none" };
const footerMuted = { color: "#9CA3AF", fontSize: "12px", margin: "12px 0 0" };
