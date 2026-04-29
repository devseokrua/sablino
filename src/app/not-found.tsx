import Link from 'next/link';

export default function NotFound() {
  return (
    <main>
      <h1>Сторінку не знайдено</h1>
      <p>Сторінка, яку ви шукаєте, не існує або була переміщена.</p>
      <Link href="/">Повернутись на головну</Link>
    </main>
  );
}
