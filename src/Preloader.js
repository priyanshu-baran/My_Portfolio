export const Preloader = () => {
  return (
    <div className='pre_body'>
      <div className='loader'>
        <div className='inner one'></div>
        <div className='inner two'></div>
        <div className='inner three'></div>
      </div>
      <div className='loading'>
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
    </div>
  );
};
