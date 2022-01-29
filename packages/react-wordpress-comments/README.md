<h1 align="center">react-wordpress-comments</h1>

<h3 align="center">
  WordPress-powered comments for React frontend
</h3>

<!-- [![Travis][build-badge]][build] -->

![npm](https://img.shields.io/npm/v/react-wordpress-comments)

<!-- [![Coveralls][coveralls-badge]][coveralls] -->

Easily add comments to your headless WordPress with **react-wordpress-comments** component.

Here's [a working demo](https://react-wp-comments.netlify.app/), where you can even check it out. Even with your own WordPress endpoint. Comment posting works, so be careful :)

**react-wordpress-comments** uses native WordPress REST API, so you don't need any additional configuration in most cases.

Using is as simple as this:

```jsx
<WpComments
  maxDepth={3}
  pageId={619}
  hostUrl="https://your-wp-site.com"
  allowComments={true}
  user={john}
/>
```

It's an **alpha version**. See [ongoing development](#ongoing-development) section for more information.

## Features

- **Native WordPress API**. No need to use any plugins for WordPress, component uses WP's built-in REST API.
- **Lazy loading**. Fetches comments after the component is mounted to the DOM.
- **Tree structure**. Shows comments in hierarchical tree with custom depth.
- **Submit comments**. Users can submit comments, including responses to other comments. You may need to enable anonymous comments via REST API if you want users to comment without authorization. This component does not have a basic auth functionality, but you can provide user data with JWT.
- **Validation before submit**. Submit form uses native HTML validation to check fields.
- **Authentication**. If your frontend uses JWT to authorize users, you can pass this user data for comment posting.

## Prerequisites

- A WordPress website with public REST API.

- react 16.8 or higher as a peer dependency.

## 🚀 Installation and usage

1. Install package in your repository with a React app:

```shell
npm install react-wordpress-comments
```

2. Import it along with React and use it:

```javascript
import React from "react"
import WpComments from "react-wordpress-comments"
import "react-wordpress-comments/css/styles.css"

function MyComponent() {
  return (
    <div>
      <h1>This is my page's title</h1>
      <p>Here goes the main content of the page</p>
      <WpComments
        maxDepth={3} // provide depth that you want comments to be nested in a list
        pageId={619} // id of a page you want to fetch comments from and post to
        hostUrl="https://wordpress.example.com" // url of your WordPress website
        allowComments={true} // can users post comments?
        user={user} // provide user if authorized, default is null. See below
      />
    </div>
  )
}

render(<MyComponent />, document.querySelector("#root"))
```

### User and authentication

`user` prop is an object that should look like this:

```javascript
let user = {
  name: "Maria",
  email: "maria@example.com",
  jwt: "jwt-string-value",
}
```

`name` and `email` properties are required.

If you authenticate users in your React app, you're probably providing user info via Context API.

If that is the case, you can construct an object with user name, email, and JWT string to pass down to comments section. The component will automatically send `Authorization` header with `Bearer: "jwt-string-value"` when posting the comment.

Note that by default WordPress does not support JWT. You will need a [plugin](https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/) for that.

### Known limitations

#### Number of comments fetched

The component will load only 100 comments from an API. Pagination is a feature that is yet to come.

#### Authorization

By default there are two ways to submit comments — either anonymously, or authenticated-only. In order to have some sort of combined logic (anonymous or authorized for those who can be authorized) you need to implement it in WordPress.

To allow anonymous posting of comments via REST API you need to add a code snippet to your WordPress. Read more [here on Stackoverflow](https://stackoverflow.com/questions/44499359/401-rest-comment-login-required-when-posting-comment-on-wordpress-4-7-0-with-b).

#### Cross-origin resource sharing

When we use decoupled architecture, the requests are cross-origin.

WP REST API allows CORS by default. However, your server configuration might be set differently, and it would prevent comments from being posted and/or fetched. If you receive CORS errors, you may need to manually add headers that allow all origins, or use a [plugin](https://github.com/ahmadawais/WP-REST-Allow-All-CORS/). For more security, allow only one origin where your front end lives. However, allowing origin in headers is not the only thing that may prevent your browser to make a CORS request, you may need to configure your server or browser.

#### Rest API endpoint url

By default comments are fetched from `{your-wp-host}/wp-json/wp/v2/comments` endpoint.

If you're using non-pretty permalinks, your REST API endpoint URL may be different from standard, in this case the component won't work. As of now the only way to change it is to change the source code of the component.

## Alternative way to use this component

Simply copy the content from `src/` folder of this repo and drop it into your React app's `src/components/wpComments` folder (or whatever structure you use). Then simply import it like you would any other component you've written. Don't forget to grab `/css/styles.css` file too if you need it :)

## Styling

The package has a `styles.css` file that provides some basic styles and a loader spinner. If you import it along with the component like this:

```javascript
import "react-wordpress-comments/css/styles.css"
```

It uses very minimal styling, most of its look will be inherited so that the comments match overall style of your page. You can override styles by using more specific selectors.

Otherwise use your own stylesheet without importing component's styles at all. More comprehensive guide on styling coming soon, for now please refer to source code or your browser's devtools.

## Ongoing development

Upgrades, features and bugfixes to come:

- Error boundaries and better error handling. At this point the component may crash your app if there is an error ☹️
- Tests and CI automation
- Links processing. If you don't specify your frontend host in WordPress, the links within comments will point to your backend host.
- Add an easy way to change text strings and implement i18n.
- Implementing other types of authorization, including cookies.
- Caching/storing of response. Now it fetches each time page loads.
- Paginating requests.
- Migrating to TypeScript

## Contributing

If you have a feedback or suggestion, just file an issue. Anything is welcome.

To contribute to code, see [contributing guide](./CONTRIBUTING.md).

## License

Licensed under the [MIT License](./LICENSE).

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
