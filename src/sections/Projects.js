import { useState } from 'react';

import { projects, settings } from '../data/portfolio';
import { Reveal, SectionHeader } from './ui';

const ProjectCard = ({ project, index }) => {
  const [expanded, setExpanded] = useState(false);
  const long = project.description.length > 170;
  const { code, demo, video, details } = project.links || {};
  return (
    <Reveal
      as='article'
      index={index % 2}
      className='card project-card'>
      <div className='proj-media'>
        <div
          className='proj-bg'
          style={{ backgroundImage: `url(${project.image})` }}
          aria-hidden='true'></div>
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading='lazy'
          decoding='async'
        />
      </div>
      <div className='proj-body'>
        <p className='mono proj-period'>{project.period}</p>
        <h3>{project.title}</h3>
        <p className={`proj-desc ${long && !expanded ? 'is-clamped' : ''}`}>
          {project.description}
        </p>
        {long && (
          <button
            type='button'
            className='link-btn'
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}>
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
        {project.tech?.length > 0 && (
          <ul
            className='chips chips-sm'
            aria-label='Technologies used'>
            {project.tech.map((t) => (
              <li
                className='chip'
                key={t}>
                {t}
              </li>
            ))}
          </ul>
        )}
        <div className='proj-actions'>
          {code && (
            <a
              className='btn btn-small btn-primary'
              href={code}
              target='_blank'
              rel='noreferrer noopener'
              aria-label={`${project.title}: source code on GitHub`}>
              <i
                className='fa-brands fa-github'
                aria-hidden='true'></i>
              Code
            </a>
          )}
          {demo && (
            <a
              className='btn btn-small btn-secondary'
              href={demo}
              target='_blank'
              rel='noreferrer noopener'
              aria-label={`${project.title}: live demo`}>
              <i
                className='fa-solid fa-arrow-up-right-from-square'
                aria-hidden='true'></i>
              Live demo
            </a>
          )}
          {video && (
            <a
              className='btn btn-small btn-secondary'
              href={video}
              target='_blank'
              rel='noreferrer noopener'
              aria-label={`${project.title}: video walkthrough`}>
              <i
                className='fa-solid fa-circle-play'
                aria-hidden='true'></i>
              Video
            </a>
          )}
          {details && (
            <a
              className='link-arrow'
              href={details}
              target='_blank'
              rel='noreferrer noopener'
              aria-label={`${project.title}: README`}>
              README
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
};

export const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const limit = settings.projectsVisible;
  const visible = showAll ? projects : projects.slice(0, limit);
  return (
    <section
      id='projects'
      className='section'
      aria-labelledby='projects-title'>
      <div className='container'>
        <SectionHeader
          id='projects-title'
          index='03'
          eyebrow='Projects'
          title='Things I Have Built'
          subtitle='Selected projects with source code and live demos.'
        />
        <div className='projects-grid'>
          {visible.map((p, i) => (
            <ProjectCard
              key={p.title}
              project={p}
              index={i}
            />
          ))}
        </div>
        {projects.length > limit && (
          <div className='center-row'>
            <button
              type='button'
              className='btn btn-secondary'
              aria-expanded={showAll}
              onClick={() => setShowAll((v) => !v)}>
              {showAll
                ? 'Show fewer projects'
                : `Show all ${projects.length} projects`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
