const req = require.context('./', true, /\.main.js$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
export default requireAll(req)