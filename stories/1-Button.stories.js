import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import Comments from '../src';
import '../src/remark-ninja.css';

export default {
  title: 'RemarkNinja',
  component: Comments
};

export const Demo = () => {
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

export const Text = () => (
  <Button onClick={action('clicked')}>Hello Button</Button>
);

export const Emoji = () => (
  <Button onClick={action('clicked')}>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
