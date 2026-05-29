'use client';

import { Button } from '@/design/Button/Button';
import { Facebook, Instagram, Mail, Phone } from '@/design/Icon/icons';
import { Text } from '@/design/Text/Text';
import S from './ContactBand.styles';

type ContactInfo = {
  title: string;
  phone?: string;
  email?: string;
  checkInNote?: string;
  facebookHref?: string;
  instagramHref?: string;
};

type FormCopy = {
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  messageLabel: string;
  consentLabel: string;
  submitLabel: string;
};

type ContactBandProps = {
  info: ContactInfo;
  formCopy: FormCopy;
  onSubmit?: (form: FormData) => void;
};

export function ContactBand({ info, formCopy, onSubmit }: ContactBandProps) {
  return (
    <S.Root>
      <S.InfoColumn>
        <Text as="h2" uppercase letterSpacing="wider">
          {info.title}
        </Text>
        <S.InfoList>
          {info.phone ? (
            <S.InfoItem>
              <Phone size={20} tone="accent" />
              <Text size="base">{info.phone}</Text>
            </S.InfoItem>
          ) : null}
          {info.email ? (
            <S.InfoItem>
              <Mail size={20} tone="accent" />
              <Text size="base">{info.email}</Text>
            </S.InfoItem>
          ) : null}
          {info.checkInNote ? (
            <S.InfoItem>
              <Text size="sm" tone="muted">
                {info.checkInNote}
              </Text>
            </S.InfoItem>
          ) : null}
        </S.InfoList>
        <S.Socials>
          {info.facebookHref ? (
            <a href={info.facebookHref} aria-label="Facebook" rel="noopener noreferrer">
              <Facebook size={22} tone="accent" />
            </a>
          ) : null}
          {info.instagramHref ? (
            <a href={info.instagramHref} aria-label="Instagram" rel="noopener noreferrer">
              <Instagram size={22} tone="accent" />
            </a>
          ) : null}
        </S.Socials>
      </S.InfoColumn>
      <S.FormColumn
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) onSubmit(new FormData(e.currentTarget));
        }}
      >
        <S.Field>
          <Text as="label" htmlFor="contact-name">
            {formCopy.nameLabel}
          </Text>
          <S.Input id="contact-name" name="name" type="text" required />
        </S.Field>
        <S.Field>
          <Text as="label" htmlFor="contact-email">
            {formCopy.emailLabel}
          </Text>
          <S.Input id="contact-email" name="email" type="email" required />
        </S.Field>
        <S.Field>
          <Text as="label" htmlFor="contact-phone">
            {formCopy.phoneLabel}
          </Text>
          <S.Input id="contact-phone" name="phone" type="tel" />
        </S.Field>
        <S.Field>
          <Text as="label" htmlFor="contact-message">
            {formCopy.messageLabel}
          </Text>
          <S.Textarea id="contact-message" name="message" required />
        </S.Field>
        <S.ConsentRow>
          <input id="contact-consent" name="consent" type="checkbox" required />
          <Text as="label" htmlFor="contact-consent" size="sm" tone="muted">
            {formCopy.consentLabel}
          </Text>
        </S.ConsentRow>
        <S.SubmitRow>
          <Button type="submit">{formCopy.submitLabel}</Button>
        </S.SubmitRow>
      </S.FormColumn>
    </S.Root>
  );
}
