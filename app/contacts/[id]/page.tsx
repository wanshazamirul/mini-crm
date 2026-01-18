import { ContactDetail } from '@/components/contacts/contact-detail';

export default function ContactDetailPage({ params }: { params: { id: string } }) {
  return <ContactDetail contactId={params.id} />;
}
