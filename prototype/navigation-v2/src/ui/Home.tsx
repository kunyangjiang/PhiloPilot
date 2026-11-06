import { TopBar } from './Chrome';
import SwissHome from './SwissHome';

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="home">
      <TopBar />
      <SwissHome />
    </main>
  );
}
