import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { trpc } from '@/server/clients/server-api';

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      'Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local',
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing Svix headers', {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error: Could not verify webhook:', err);
    return new Response('Error: Verification error', {
      status: 400,
    });
  }

  // Do something with payload
  try {
    const eventType = evt.type;
    if (eventType === 'user.created') {
      const {
        first_name: firstName,
        id: clerkId,
        image_url: imageUrl,
        last_name: lastName,
        username,
      } = evt.data;
      await trpc.users.createUser({
        firstName,
        clerkId,
        imageUrl,
        lastName,
        username,
      });
    }
    if (eventType === 'user.updated') {
      const {
        first_name: firstName,
        id: clerkId,
        image_url: imageUrl,
        last_name: lastName,
        username,
      } = evt.data;
      await trpc.users.editUser({
        firstName,
        clerkId,
        imageUrl,
        lastName,
        username,
      });
    }
    if (eventType === 'user.deleted') {
      const { id: clerkId } = evt.data;
      if (clerkId === undefined) {
        throw new Error('User cannot be deleted');
      }
      await trpc.users.deleteUser({ clerkId });
    }
  } catch (err) {
    console.error('Error: Could not save to database:', err);
    return new Response('Error: Server error', {
      status: 500,
    });
  }

  return new Response('Webhook received', { status: 200 });
}
