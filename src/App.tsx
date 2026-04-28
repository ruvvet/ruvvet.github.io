import { Sidebar } from './components/Sidebar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Resume } from './components/Resume';
import { Work } from './components/Work';
import { Contact } from './components/Contact';
import { BackToTop } from './components/BackToTop';
import { useScrollSpy } from './hooks/useScrollSpy';
import { navItems } from './content/nav';

function App() {
  const ids = navItems.map((n) => n.id);
  const activeId = useScrollSpy(ids);

  return (
    <div className="min-h-screen bg-bg text-text">
      <Sidebar activeId={activeId} />
      <main className="xl:pl-72">
        <Hero />
        <About />
        <Skills />
        <Resume />
        <Work />
        <Contact />
      </main>
      <BackToTop />
    </div>
  );
}

export default App;
