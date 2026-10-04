import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppSidebar from '../components/AppSidebar';
import '../styles/tn-seo-pages.css';

const favoriteStyles = [
  'from-green-400 to-green-800',
  'from-blue-400 to-blue-700',
  'from-amber-300 to-amber-600',
  'from-violet-400 to-violet-700',
];

function Icon({ children, className = 'h-4 w-4', ...props }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

function StatusBadge({ project }) {
  if (project.status === 'paused') {
    return null;
  }
  if (project.status === 'issues') {
    return <span className="rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-bold uppercase text-red-800">{project.issues} Issues</span>;
  }
  return <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-bold uppercase text-green-800">Healthy</span>;
}

function ProjectCard({ project, onApply, onDelete, onOpen }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnOutside = (event) => {
      if (!event.target.closest('[data-project-menu]')) setMenuOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    document.addEventListener('mousedown', closeOnOutside);
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOnOutside);
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-green-400 hover:shadow-lg">
      <div className="flex items-start gap-3">
        <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-base font-bold text-white ${favoriteStyles[project.fav % favoriteStyles.length]}`}>
          {project.name.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="break-words text-sm font-semibold text-slate-900">{project.name}</h2>
            <StatusBadge project={project} />
          </div>
          <p className="mt-1 truncate text-xs text-slate-400">{project.url}</p>
        </div>
        <div className="relative shrink-0" data-project-menu="">
          <button
            type="button"
            title="More options"
            aria-label={`More options for ${project.name}`}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-green-400 hover:text-green-700"
          >
            <Icon className="h-4 w-4">
              <circle cx="12" cy="5" r="1.7" fill="currentColor" stroke="none" />
              <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
              <circle cx="12" cy="19" r="1.7" fill="currentColor" stroke="none" />
            </Icon>
          </button>

          {menuOpen && (
            <div role="menu" className="absolute right-0 top-10 z-50 w-44 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
              <button
                type="button"
                role="menuitem"
                onClick={() => { setMenuOpen(false); onApply(project); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-slate-700 transition hover:bg-green-50 hover:text-green-700"
              >
                <Icon className="h-3.5 w-3.5"><path d="M20 6 9 17l-5-5" /></Icon>
                Apply
              </button>
              <button
                type="button"
                role="menuitem"
                onClick={() => { setMenuOpen(false); onDelete(project.id); }}
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-slate-600 transition hover:bg-red-50 hover:text-red-600"
              >
                <Icon className="h-3.5 w-3.5"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" /></Icon>
                Delete Project
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end">
        <button
          type="button"
          onClick={() => onOpen(project.name)}
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-green-700"
        >
          Open Project
          <Icon className="h-3 w-3"><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
        </button>
      </div>
    </article>
  );
}

function ProjectModal({ onClose, onCreate }) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim() || !url.trim()) return;
    onCreate({ name: name.trim(), url: url.trim(), keyword: keyword.trim() || '—' });
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-green-950/55 p-5 backdrop-blur-sm"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <form onSubmit={handleSubmit} className="modal-enter w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-7" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <h2 id="modal-title" className="flex items-center gap-3 text-lg font-bold text-slate-900">
          <span className="h-2.5 w-2.5 rounded-full bg-green-500 ring-4 ring-green-100" />
          Add New Project
        </h2>
        <p className="mb-5 mt-1.5 text-xs text-slate-500">Enter your website details to start tracking SEO performance.</p>

        <label className="mb-4 block text-xs font-semibold text-slate-800">
          Project Name <span className="text-red-500">*</span>
          <input autoFocus required value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. My Business Website" className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-green-50 px-3 py-2.5 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100" />
        </label>
        <label className="mb-4 block text-xs font-semibold text-slate-800">
          Website URL <span className="text-red-500">*</span>
          <input required value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com" className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-green-50 px-3 py-2.5 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100" />
        </label>
        <label className="block text-xs font-semibold text-slate-800">
          Primary Keyword
          <input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="e.g. best seo tools" className="mt-1.5 block w-full rounded-lg border border-slate-200 bg-green-50 px-3 py-2.5 text-sm font-normal outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100" />
        </label>

        <div className="mt-6 flex justify-end gap-2.5">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-600 transition hover:border-green-500 hover:text-green-700">Cancel</button>
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-700">
            <Icon className="h-3.5 w-3.5"><path d="M12 5v14M5 12h14" /></Icon>
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Projects() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastTimer = useRef(null);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  function showToast(message) {
    window.clearTimeout(toastTimer.current);
    setToastMessage(message);
    toastTimer.current = window.setTimeout(() => setToastMessage(''), 2600);
  }

  function createProject(details) {
    const normalizedUrl = /^https?:\/\//i.test(details.url) ? details.url : `https://${details.url}`;
    setProjects((current) => [{
      ...details,
      id: crypto.randomUUID(),
      url: normalizedUrl,
      score: 0,
      keywords: 0,
      pages: 0,
      issues: 0,
      status: 'paused',
      updated: 'just now',
      fav: current.length % favoriteStyles.length,
    }, ...current]);
    setModalOpen(false);
    showToast(`Project "${details.name}" created`);
  }

  function deleteProject(id) {
    const project = projects.find((item) => item.id === id);
    if (!project || !window.confirm(`Delete project "${project.name}"? This cannot be undone.`)) return;
    setProjects((current) => current.filter((item) => item.id !== id));
    showToast('Project deleted');
  }

  return (
    <>
      <AppSidebar
        mobileOpen={sidebarOpen}
        setMobileOpen={setSidebarOpen}
        onSelect={(label) => showToast(`${label} selected`)}
      />

      <div className="projects-root min-h-screen bg-[#f4f7f5] text-slate-900 lg:pl-[228px]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1500px] flex-col">
        <header className="sticky top-0 z-30 flex min-h-[62px] items-center gap-4 border-b border-slate-200 bg-white px-4 py-3 sm:px-7">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-slate-200 text-slate-700 transition hover:border-green-400 hover:text-green-700 lg:hidden"
          >
            <Icon className="h-4 w-4"><path d="M4 6h16M4 12h16M4 18h16" /></Icon>
          </button>
          <button
            type="button"
            onClick={() => showToast('Returning to Home')}
            className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-800 shadow-sm transition hover:border-green-500 hover:text-green-700"
          >
            <Icon className="h-3.5 w-3.5"><path d="M19 12H5M12 19l-7-7 7-7" /></Icon>
            Back to Home
          </button>
          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-green-400 to-green-800 text-sm font-bold text-white">N</div>
            <div className="hidden leading-tight sm:block">
              <b className="block text-xs font-semibold">Good Evening,</b>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-green-600">New Guest</span>
            </div>
            <Icon className="h-3.5 w-3.5 text-slate-400"><path d="m6 9 6 6 6-6" /></Icon>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1240px] flex-1 px-4 pb-10 pt-6 sm:px-7 sm:pt-8">
          <section className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-[220px] flex-1">
              <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-[30px]">
                <Icon className="h-6 w-6 text-green-600"><path d="M3 6h6l2 2h10v11H3z" /></Icon>
                Projects<span className="text-green-600">.</span>
              </h1>
              <p className="mt-1 text-xs leading-5 text-slate-600 sm:text-[13px]">Manage and monitor all your SEO projects, audits and rankings in one place.</p>
            </div>
            <button type="button" onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-green-600 to-green-700 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-green-700/20 transition hover:-translate-y-0.5 hover:brightness-105 sm:px-5 sm:py-3 sm:text-[13px]">
              <Icon className="h-4 w-4"><path d="M12 5v14M5 12h14" /></Icon>
              Add New Project
            </button>
          </section>

          {projects.length === 0 ? (
            <section className="rounded-xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm sm:py-16">
              <div className="mx-auto mb-5 grid h-[68px] w-[68px] place-items-center rounded-full border border-green-100 bg-green-50 text-green-500">
                <Icon className="h-8 w-8" strokeWidth="1.6"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></Icon>
              </div>
              <h2 className="text-xl font-bold">No projects <span className="text-green-600">yet</span></h2>
              <p className="mx-auto mb-5 mt-2 max-w-sm text-[13px] leading-6 text-slate-600">Create your first project to start tracking SEO performance, rankings and analytics.</p>
              <button type="button" onClick={() => setModalOpen(true)} className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-700">
                <Icon className="h-4 w-4"><path d="M12 5v14M5 12h14" /></Icon>
                Create Your First Project
              </button>
            </section>
          ) : (
            <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" aria-label="Projects">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onApply={(item) => showToast(`Project "${item.name}" applied`)}
                  onDelete={deleteProject}
                  onOpen={() => navigate('/reports')}
                />
              ))}
            </section>
          )}

          <section className="mt-7 flex flex-wrap items-center gap-4 rounded-xl border border-green-100 bg-gradient-to-r from-green-50 via-green-50 to-emerald-100 px-5 py-5 sm:px-6">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-green-500 to-green-700 text-white shadow-md shadow-green-700/20">
              <Icon className="h-6 w-6"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" fill="currentColor" /></Icon>
            </div>
            <div className="min-w-[190px] flex-1">
              <h2 className="text-base font-bold text-green-950">Boost <span className="text-green-600">all your projects</span> with AI</h2>
              <p className="mt-0.5 text-xs leading-5 text-slate-600">Get personalized recommendations to improve every project's SEO and rank higher.</p>
            </div>
            <button type="button" onClick={() => showToast('AI optimization queued for all projects')} className="rounded-lg bg-green-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-700">Optimize with AI <span aria-hidden="true">→</span></button>
          </section>
        </main>
      </div>

      {modalOpen && <ProjectModal onClose={() => setModalOpen(false)} onCreate={createProject} />}
      {toastMessage && (
        <div role="status" className="toast-enter fixed bottom-5 right-5 z-[60] flex max-w-[calc(100vw-2.5rem)] items-center gap-2 rounded-lg bg-green-900 px-4 py-3 text-sm font-medium text-white shadow-xl">
          <Icon className="h-4 w-4 shrink-0 text-lime-300"><path d="m20 6-11 11-5-5" /></Icon>
          <span>{toastMessage}</span>
        </div>
      )}
      </div>
    </>
  );
}