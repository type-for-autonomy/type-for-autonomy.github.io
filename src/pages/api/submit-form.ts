import type { APIRoute } from 'astro';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';


const adminApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert({
         projectId: import.meta.env.FIREBASE_PROJECT_ID,
      clientEmail: import.meta.env.FIREBASE_CLIENT_EMAIL,
      privateKey: import.meta.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      })
    });

const db = getFirestore(adminApp);

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    console.log(Object.fromEntries(formData.entries()));

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      interests: formData.getAll('interests'),
      comments: formData.get('comments'),
      agree: formData.get('agree') === 'on',
      submittedAt: new Date(),
    };

    await db.collection('contact_submissions').add(payload);

    return new Response(
      JSON.stringify({
        message: 'Form submitted successfully!'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

  } catch (error: any) {
    console.error(error);

    return new Response(
      JSON.stringify({
        message: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
};