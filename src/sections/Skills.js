import { skillGroups } from '../data/portfolio';
import { Reveal, SectionHeader } from './ui';

const Dots = ({ level }) => (
  <span
    className='dots'
    role='img'
    aria-label={`Proficiency ${level} out of 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <i
        key={n}
        className={n <= level ? 'on' : ''}></i>
    ))}
  </span>
);

export const Skills = () => (
  <section
    id='skills'
    className='section'
    aria-labelledby='skills-title'>
    <div className='container'>
      <SectionHeader
        id='skills-title'
        index='02'
        eyebrow='Tech stack'
        title='Technologies I Work With'
        subtitle='The languages, frameworks and cloud services I use to build and ship applications.'
      />
      <div className='skills-grid'>
        {skillGroups.map((group, i) => (
          <Reveal
            as='article'
            index={i % 4}
            className='card skill-card'
            key={group.title}>
            <h3>
              <span
                className='icon-bubble'
                aria-hidden='true'>
                <i className={`fa-solid ${group.icon}`}></i>
              </span>
              {group.title}
            </h3>
            <ul className='chips'>
              {group.skills.map((skill) => (
                <li
                  className='chip'
                  key={skill.name}>
                  {skill.name}
                  {skill.level ? <Dots level={skill.level} /> : null}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
