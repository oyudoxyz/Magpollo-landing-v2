import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Link,
} from '@react-email/components';

interface FormToEmailProps {
  name: string;
  email: string;
  company?: string;
  message?: string;
  selectedServices: Array<{ id: number; title: string }>;
  /** Structured intake answers. When present these replace the plain message body. */
  details?: Array<{ label: string; value: string }>;
  files?: Array<{ name: string }>;
}

export const FormToEmail: React.FC<FormToEmailProps> = ({
  name,
  email,
  company,
  message,
  selectedServices,
  details,
  files,
}) => {
  const previewText = `New intake from ${name} (${email})`;
  const hasDetails = !!details && details.length > 0;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New intake from the Magpollo website</Heading>

          <Section style={section}>
            <Heading as="h2" style={subheading}>Who</Heading>
            <Text style={text}>
              <strong>Name:</strong> {name}
            </Text>
            <Text style={text}>
              <strong>Email:</strong>{' '}
              <Link href={`mailto:${email}`} style={link}>
                {email}
              </Link>
            </Text>
            {company && (
              <Text style={text}>
                <strong>Firm:</strong> {company}
              </Text>
            )}
          </Section>

          {hasDetails ? (
            details.map((detail) => (
              <React.Fragment key={detail.label}>
                <Hr style={hr} />
                <Section style={section}>
                  <Heading as="h2" style={subheading}>{detail.label}</Heading>
                  {detail.value.split('\n').map((line, i) => (
                    <Text key={i} style={text}>{line}</Text>
                  ))}
                </Section>
              </React.Fragment>
            ))
          ) : (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading as="h2" style={subheading}>Selected</Heading>
                {selectedServices.length > 0 ? (
                  <ul style={list}>
                    {selectedServices.map((service) => (
                      <li key={service.id} style={listItem}>
                        {service.title}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Text style={text}>Nothing selected.</Text>
                )}
              </Section>

              {message && (
                <>
                  <Hr style={hr} />
                  <Section style={section}>
                    <Heading as="h2" style={subheading}>Message</Heading>
                    <Text style={text}>{message}</Text>
                  </Section>
                </>
              )}
            </>
          )}

          {files && files.length > 0 && (
            <>
              <Hr style={hr} />
              <Section style={section}>
                <Heading as="h2" style={subheading}>Attachments</Heading>
                <ul style={list}>
                  {files.map((file, index) => (
                    <li key={index} style={listItem}>
                      {file.name}
                    </li>
                  ))}
                </ul>
              </Section>
            </>
          )}

          <Hr style={hr} />

          <Section style={footer}>
            <Text style={footerText}>
              &copy; {new Date().getFullYear()} Magpollo. All rights reserved.
            </Text>
            <Text style={footerText}>
              Sent by the intake form at magpollo.com.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#ffffff',
  maxWidth: '600px',
};

const heading = {
  color: '#CE4257',
  fontSize: '22px',
  lineHeight: '1.3',
  fontWeight: '700',
  margin: '20px 0 30px',
};

const subheading = {
  color: '#6B6861',
  fontSize: '11px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  lineHeight: '1.3',
  fontWeight: '600',
  margin: '20px 0 8px',
};

const section = {
  padding: '0 15px',
};

const text = {
  color: '#1A1A1A',
  fontSize: '15px',
  lineHeight: '1.5',
  margin: '6px 0',
};

const list = {
  margin: '10px 0',
  paddingLeft: '20px',
};

const listItem = {
  margin: '5px 0',
  color: '#1A1A1A',
  fontSize: '15px',
  lineHeight: '1.5',
};

const link = {
  color: '#CE4257',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#e5e5e5',
  margin: '20px 0',
};

const footer = {
  padding: '0 15px',
  marginTop: '20px',
};

const footerText = {
  color: '#8a8a8a',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '4px 0',
};

export default FormToEmail;
