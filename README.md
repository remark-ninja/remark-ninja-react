# Remark Ninja

## Introduction

[Remark Ninja](https://remark.ninja) is a light-weight comment system
for GatsbyJS (and other React-based) sites.

## Integration

### Register and create a site

[Remark Ninja](https://remark.ninja) is a hosted service, so you need
to [register](https://manage.remark.ninja/register) and create a site
first.

### React-based sites

Install the `remark-ninja-react` component:

```
npm i -S remark-ninja-react
```

Then place the component at the appropriate place in your project.

```javascript
import Comments from 'remark-ninja-react';

// ...

<Comments siteId='your-site-id'
          threadSlug='unique-thread-slug' />
```

Explanation of the props:

| Props        | Meaning                                                                                          |
|--------------|--------------------------------------------------------------------------------------------------|
| `siteId`     | Unique ID for the site. You can find it on the site settings page                                |
| `threadSlug` | Optional. Unique ID for the current comment thread. Generated from the page URL path if omitted. |

Please refer to the [documentation](https://remark.ninja/docs/) for
further information.
