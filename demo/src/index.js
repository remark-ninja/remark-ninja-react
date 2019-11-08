import React, { useState } from 'react';
import { render } from 'react-dom';

import Comments from '../../src';
import '../../src/remark-ninja.css';

const Demo = () => {
  const [siteId, setSiteId] = useState(localStorage.getItem('rn-demo-siteId'));
  const [pendingSiteId, setPendingSiteId] = useState(siteId || '');
  return (
    <div>
      <h1>remark-ninja-react Demo</h1>
      <div>
        <input
          value={pendingSiteId}
          onChange={e => {
            setPendingSiteId(e.target.value);
            localStorage.setItem('rn-demo-siteId', e.target.value);
          }}
        />
        <button onClick={() => setSiteId(pendingSiteId)}>Set siteId</button>
      </div>
      {!!siteId && (
        <Comments siteId={siteId} threadSlug="/some/thread/" pageSize={10} />
      )}
    </div>
  );
};

render(<Demo />, document.querySelector('#demo'));
