import React, { useState, useEffect } from 'react';
import axios from 'axios';

import text from './text';

import './remark-ninja.css';

const rnUrlPrefix = 'https://api.rmninja.com';

const checkHttpStatus = resp => {
  if (resp.status >= 400) {
    throw new Error(resp.data.message);
  } else {
    return resp.data;
  }
};

const loadComments = ({ siteId, threadSlug, start, limit }) => {
  start = start === undefined ? 0 : start;
  limit = limit === undefined ? 10 : limit;
  threadSlug = threadSlug || location.pathname;
  return axios
    .get(
      `${rnUrlPrefix}/api/1/sites/${encodeURIComponent(
        siteId
      )}/threads/${encodeURIComponent(threadSlug)}/comments`,
      {
        params: {
          start,
          limit
        }
      }
    )
    .then(checkHttpStatus);
};

const postComment = ({ siteId, threadSlug, authorName, authorEmail, body }) => {
  threadSlug = threadSlug || location.pathname;
  return axios
    .post(`${rnUrlPrefix}/api/1/comments`, {
      siteId,
      threadSlug,
      authorName,
      authorEmail,
      body
    })
    .then(checkHttpStatus);
};

const lsGet = key =>
  typeof localStorage !== 'undefined' && localStorage.getItem(key);
const lsSet = (key, val) =>
  typeof localStorage !== 'undefined' && localStorage.setItem(key, val);

const lsAuthorNameKey = 'rnCommentAuthorName';
const lsAuthorEmailKey = 'rnCommentAuthorEmail';

// TODO: cache authorName and authorEmail in the client.
const CommentForm = ({ siteId, threadSlug, onNewComment }) => {
  const [authorName, setAuthorName] = useState(lsGet(lsAuthorNameKey) || '');
  const [authorEmail, setAuthorEmail] = useState(lsGet(lsAuthorEmailKey) || '');
  const [body, setBody] = useState('');
  const [error, setError] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const submit = e => {
    e.preventDefault();
    e.stopPropagation();
    const btn = e.target;
    btn.disabled = true;
    lsSet(lsAuthorNameKey, authorName);
    lsSet(lsAuthorEmailKey, authorEmail);
    setError(undefined);
    setMessage(undefined);
    postComment({ siteId, threadSlug, authorName, authorEmail, body })
      .then(() => {
        setMessage(text('submitted'));
        setBody('');
        onNewComment();
      })
      .catch(e => {
        setError(e.message);
      })
      .finally(() => {
        btn.disabled = false;
      });
  };
  return (
    <form className="rn-comment-form">
      {error !== undefined && <div className="rn-error">{error}</div>}
      <div className="rn-author-box">
        <div className="rn-author-name-box">
          <label htmlFor="rn-author-name">{text('name')}</label>
          <input
            id="rn-author-name"
            value={authorName}
            onChange={e => setAuthorName(e.target.value)}
            placeholder={text('name_placeholder')}
          />
        </div>
        <div className="rn-author-email-box">
          <label htmlFor="rn-author-email">{text('email')}</label>
          <input
            id="rn-author-email"
            type="email"
            placeholder={text('email_placeholder')}
            value={authorEmail}
            onChange={e => setAuthorEmail(e.target.value)}
          />
        </div>
      </div>
      <label htmlFor="rn-body">{text('comment')}</label>
      <textarea
        id="rn-body"
        rows="5"
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <input onClick={submit} type="submit" value={text('submit')} />
      {message !== undefined && <span className="rn-success">{message}</span>}
      <div className="rn-promo-link">
        {text('powered_by')} <a href="https://remark.ninja">Remark Ninja</a>.
      </div>
    </form>
  );
};

const Comment = ({ authorName, gravatarHash, body, createdAt }) => {
  const date = new Date(createdAt);
  return (
    <div className="rn-comment-item">
      <div className="rn-gravatar">
        <img
          alt={`Avatar for ${authorName}`}
          src={`https://www.gravatar.com/avatar/${gravatarHash}?s=40`}
        />
      </div>
      <div className="rn-main-section">
        <div className="rn-author-name">{authorName || text('guest')}</div>
        <div className="rn-date">{date.toLocaleDateString()}</div>
        <div
          className="rn-comment-body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>
    </div>
  );
};

const Comments = ({ siteId, threadSlug, pageSize }) => {
  const [comments, setComments] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [start, setStart] = useState(0);
  const limit = pageSize === undefined ? 20 : pageSize;
  const load = () => {
    loadComments({ siteId, threadSlug, start, limit })
      .then(cs => {
        setComments(cs);
        setError(undefined);
      })
      .catch(e => {
        setError(e.message);
      });
  };
  const prevPage = () => {
    setStart(Math.max(start - limit, 0));
  };
  const nextPage = () => {
    setStart(start + limit);
  };

  useEffect(load, [siteId, threadSlug, pageSize, start, limit]);

  if (comments === undefined && error === undefined) {
    return <div>{text('loading_comments')}</div>;
  } else if (comments == undefined && error !== undefined) {
    return <div className="rn-error">Failed to load comments: {error}</div>;
  } else {
    return (
      <div>
        <CommentForm
          siteId={siteId}
          threadSlug={threadSlug}
          onNewComment={load}
        />
        {!!error && <div className="rn-error">{error}</div>}
        <ul className="rn-comment-list">
          {comments.map(c => (
            <li key={c.id} id={`rn-comment-${c.id}`}>
              <Comment
                authorName={c.authorName}
                gravatarHash={c.gravatarHash}
                body={c.bodyHTML}
                createdAt={c.createdAt}
              />
            </li>
          ))}
        </ul>
        <div className="rn-pagination">
          {start > 0 && <a onClick={prevPage}>{text('prev_page')}</a>}
          {comments.length === limit && (
            <a onClick={nextPage}>{text('next_page')}</a>
          )}
        </div>
      </div>
    );
  }
};

export default Comments;
