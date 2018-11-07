var isArray = Array.isArray
var isFeed = require('ssb-ref').isFeed

exports.gives = {
  compose: {
    post: true
  }
}

exports.needs = {
  identity: {
    main: 'first'
  }
}

exports.create = function (api) {
  return {compose: {post:
    function (content, context) {
      if(content.recps && content.recps.length === 0 && isArray(content.mentions))
        content.recps = content.mentions.map(function (e) {
          return isFeed(e) ? e : isFeed(e.link) ? e.link : null
        })
        .filter(Boolean)
        .concat(api.identity.main())
        .filter(function (e, i, a) {
          //filter any repeated mentions
          return a.indexOf(e) !== i
        })
      return content
    }
  }}
}



