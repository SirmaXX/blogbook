var compose = require('transformer-compose')
var conversions = [
<% map(conversions, function(c) { %>  require('transformer.<%= c.src.id %>'),
<% }) %>]
<% if (async) { %>
module.exports = compose.async(conversions)<% } else { %>
module.exports = compose.sync(conversions)<% } %>