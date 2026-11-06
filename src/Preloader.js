import LQIP from './lqip';

/**
 * Loading screen. On the landing page it shows a blurred preview of the scene
 * and a real progress bar (`progress` is 0..1), so the wait feels short.
 */
export const Preloader = ({ progress, preview = false }) => {
  const hasProgress = typeof progress === 'number';
  return (
    <div
      className={`pre_body ${preview ? 'has-preview' : ''}`}
      role='status'
      aria-live='polite'
      aria-label='Loading'>
      {preview && (
        <div
          className='pre_preview'
          style={{ backgroundImage: `url(${LQIP})` }}
          aria-hidden='true'
        />
      )}
      <div className='loader'>
        <div className='inner one'></div>
        <div className='inner two'></div>
        <div className='inner three'></div>
      </div>
      <div
        className='loading'
        aria-hidden='true'>
        <div className='loading-text'>
          <span className='loading-text-words'>L</span>
          <span className='loading-text-words'>O</span>
          <span className='loading-text-words'>A</span>
          <span className='loading-text-words'>D</span>
          <span className='loading-text-words'>I</span>
          <span className='loading-text-words'>N</span>
          <span className='loading-text-words'>G</span>
        </div>
      </div>
      {hasProgress && (
        <div
          className='pre_progress'
          aria-hidden='true'>
          <span style={{ transform: `scaleX(${Math.max(0.04, progress)})` }} />
        </div>
      )}
    </div>
  );
};
