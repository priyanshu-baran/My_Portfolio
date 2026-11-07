import { contact, journey, profile } from '../data/portfolio';
import { Reveal, SectionHeader } from './ui';

const TYPE_META = {
  education: { icon: 'fa-graduation-cap', label: 'Education' },
  school: { icon: 'fa-school', label: 'School' },
  achievement: { icon: 'fa-award', label: 'Achievement' },
  work: { icon: 'fa-briefcase', label: 'Experience' },
  project: { icon: 'fa-code', label: 'Project' },
};

export const Journey = () => (
  <section
    id='about'
    className='section'
    aria-labelledby='about-title'>
    <div className='container'>
      <SectionHeader
        id='about-title'
        index='01'
        eyebrow='Journey'
        title='Education & Milestones'
        subtitle='Where I studied and what I have achieved so far.'
      />
      <div className='about-grid'>
        <Reveal
          as='aside'
          className='card facts-card'
          aria-label='Quick facts'>
          <h3>Quick facts</h3>
          <dl>
            <div>
              <dt>
                <i
                  className='fa-solid fa-laptop-code'
                  aria-hidden='true'></i>
                Role
              </dt>
              <dd>{profile.role}</dd>
            </div>
            <div>
              <dt>
                <i
                  className='fa-solid fa-graduation-cap'
                  aria-hidden='true'></i>
                Studying
              </dt>
              <dd>{profile.status}</dd>
            </div>
            <div>
              <dt>
                <i
                  className='fa-solid fa-layer-group'
                  aria-hidden='true'></i>
                Core stack
              </dt>
              <dd>{profile.coreStack}</dd>
            </div>
            <div>
              <dt>
                <i
                  className='fa-solid fa-location-dot'
                  aria-hidden='true'></i>
                Based in
              </dt>
              <dd>{contact.location}</dd>
            </div>
          </dl>
        </Reveal>
        <ol className='timeline'>
          {journey.map((entry, i) => {
            const meta = TYPE_META[entry.type] || TYPE_META.project;
            return (
              <Reveal
                as='li'
                index={i % 3}
                className={`tl-item tl-${entry.type}`}
                key={`${entry.title}-${entry.period}`}>
                <span
                  className='tl-dot'
                  aria-hidden='true'>
                  <i className={`fa-solid ${meta.icon}`}></i>
                </span>
                <article className='card tl-card'>
                  <div className='tl-top'>
                    <span className='badge'>{meta.label}</span>
                    <time className='mono'>{entry.period}</time>
                  </div>
                  <h3>{entry.title}</h3>
                  {entry.org && <p className='tl-org'>{entry.org}</p>}
                  {entry.description && <p>{entry.description}</p>}
                  <div className='tl-foot'>
                    {entry.highlight && (
                      <span className='chip chip-accent'>
                        {entry.highlight}
                      </span>
                    )}
                    {entry.link && (
                      <a
                        className='link-arrow'
                        href={entry.link.url}
                        target='_blank'
                        rel='noreferrer noopener'>
                        {entry.link.label}
                        <i
                          className='fa-solid fa-arrow-up-right-from-square'
                          aria-hidden='true'></i>
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </div>
  </section>
);
