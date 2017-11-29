import React, { Component } from 'react';

function Title(props) {
//   console.log(props);
// return <div>{props.newsfeed.map(article => {
//       return <h1>{article.content.title}</h1>
//       })}
//     </div>
return Object.keys(props).map(key =>
            <h1>
              {key}:{props[key].content.title}
            </h1>
)
}

export default Title;
