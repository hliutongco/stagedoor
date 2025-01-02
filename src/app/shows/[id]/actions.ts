export async function createWatchedShow(data: FormData) {
  'use server';
  console.log(data.get('id'));
}
