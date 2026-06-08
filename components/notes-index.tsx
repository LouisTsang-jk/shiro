import { MotionLink as Link } from "./motion-link";
import type { Note } from "@/lib/content";
import { groupNotesByMonth } from "@/lib/content";
import { formatDay } from "@/lib/format";
import { localizedPath, t, type Locale } from "@/lib/i18n";

type NotesIndexProps = {
  notes: Note[];
  lang: Locale;
};

export function NotesIndex({ notes, lang }: NotesIndexProps) {
  const months = groupNotesByMonth(notes);
  return (
    <>
      <header style={{ padding: "24px 0 64px" }}>
        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 64,
            lineHeight: 1,
            letterSpacing: "0.005em",
            color: "var(--ink)",
          }}
        >
          {t(lang).notesTitle}
        </h1>
      </header>
      {months.map(({ key, year, month, entries }) => (
        <NotesMonth
          key={key}
          label={t(lang).monthYear(year, month)}
          notes={entries}
          lang={lang}
        />
      ))}
    </>
  );
}

function NotesMonth({
  label,
  notes,
  lang,
}: {
  label: string;
  notes: Note[];
  lang: Locale;
}) {
  return (
    <section style={{ marginBottom: 72 }}>
      <header
        style={{
          display: "grid",
          gridTemplateColumns: "180px 1fr auto",
          alignItems: "baseline",
          gap: 40,
          paddingBottom: 24,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 36,
            lineHeight: 1,
            letterSpacing: "0.005em",
            color: "var(--ink)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </h2>
        <span style={{ height: "0.5px", background: "var(--bone)" }} />
        <span className="t-meta">{String(notes.length).padStart(2, "0")}</span>
      </header>

      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {notes.map((note) => (
          <NoteRow key={note.slug} note={note} lang={lang} />
        ))}
      </ol>
    </section>
  );
}

function NoteRow({ note, lang }: { note: Note; lang: Locale }) {
  const day = formatDay(note.date);
  return (
    <li className="row">
      <Link
        href={localizedPath(lang, `/notes/${note.slug}`)}
        style={{
          display: "grid",
          gridTemplateColumns: "100px 1fr 120px 40px",
          columnGap: 40,
          alignItems: "start",
          padding: "28px 0",
          color: "inherit",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: 32,
              lineHeight: 1,
              color: "var(--ink)",
              letterSpacing: "-0.005em",
            }}
          >
            {day}
          </div>
          <div className="t-label" style={{ marginTop: 8 }}>
            {t(lang).noteTag[note.tag]}
          </div>
        </div>

        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-body)",
            fontSize: 17,
            lineHeight: 1.65,
            letterSpacing: "0.005em",
            color: "var(--ink)",
            maxWidth: 620,
          }}
        >
          {note.body}
        </p>

        <div
          className="t-num"
          style={{
            textAlign: "right",
            paddingTop: 10,
            viewTransitionName: `note-n-${note.slug}`,
          }}
        >
          № {note.n}
        </div>

        <div style={{ textAlign: "right", paddingTop: 8 }}>
          <span className="reveal-arrow" aria-hidden="true">
            →
          </span>
        </div>
      </Link>
    </li>
  );
}
